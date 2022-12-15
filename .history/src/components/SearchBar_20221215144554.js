import {
  useSearchActions,
  useSearchState,
  useSearchUtilities,
} from "@yext/search-headless-react";
import React, { FC, useEffect, useState } from "react";
import {
  ViewProps,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Typography } from "../styles";
import styled from "styled-components/native";
import "react-native-url-polyfill/auto";
import { useProductsContext } from "../context/ProductsContext";

const { width, height } = Dimensions.get("window");
const TextIp = styled.TextInput`
  borderwidth: 1px;
  bordercolor: "#777";
  padding: 8px;
  width: 200px;
`;
export const SearchBar = ({ setResults }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const utils = useSearchUtilities();
  const query = useSearchState((state) => state.query.query);
  const { setProductResults } = useProductsContext();
  // const verticalLimit = useSearchState((state) => state.vertical.limit);

  // useEffect(() => {
  //   searchActions.setVerticalLimit(50);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   verticalLimit === 50 && searchActions.executeVerticalQuery();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [verticalLimit]);

  // useEffect(() => {
  //   console.log("entered" + query);
  //   // searchActions
  //   //   .executeUniversalAutocomplete()
  //   //   .then((res) => console.log(res));
  // }, [searchActions, query]);

  // const renderAutoCompleteRow = (item) => (
  //   <Pressable
  //     style={({ pressed }) => [
  //       { backgroundColor: pressed ? Colors.darkGrey : Colors.offWhite },
  //       styles.rowTextContainer,
  //     ]}
  //     onPressOut={() => onRowPressOut(item)}
  //   >
  //     <Text style={styles.font}>{item}</Text>
  //   </Pressable>
  // );

  // const onRowPressOut = (item) => {
  //   setHideAutoComplete(true);
  //   searchActions.setQuery(item);
  //   searchActions.executeVerticalQuery();
  // };

  // const onSearchIconPressOut = () => {
  //   setHideAutoComplete(true);
  //   searchActions.resetFacets();
  //   searchActions.executeVerticalQuery();
  // };

  // const onXIconPressOut = () => {
  //   searchActions.setQuery("");
  //   searchActions.resetFacets();
  //   searchActions.executeVerticalQuery();
  // };

  const onChangeText = (text) => {
    setHideAutoComplete(false);
    searchActions.setQuery(text);
  };

  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions
      .executeVerticalQuery()
      .then((res) => setProductResults(res.verticalResults.results));
  };
  return (
    <View>
      <TextInput
        style={styles.textInp}
        value={queryTerm}
        onChangeText={(text) => setQueryTerm(text)}
      />

      <Button
        style={{ borderWidth: 1 }}
        title="Press me"
        onPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
