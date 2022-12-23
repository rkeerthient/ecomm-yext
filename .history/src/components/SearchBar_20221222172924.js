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
import SelectMultiple from "react-native-select-multiple";

const { width, height } = Dimensions.get("window");
const TextIp = styled.TextInput`
  borderwidth: 1px;
  bordercolor: "#777";
  padding: 8px;
  width: 200px;
`;
export const SearchBar = ({ setResults, verticalKey }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const utils = useSearchUtilities();
  const query = useSearchState((state) => state.query.query);
  const { setProductResults } = useProductsContext();
  const [fac, setFac] = useState();
  const facet = useSearchState((state) => state.filters.facets);
  const loading =
    useSearchState((state) => state.searchStatus.isLoading) || false;
  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions.setVertical(verticalKey);
    searchActions
      .executeVerticalQuery()
      .then(
        (res) => setProductResults(res.verticalResults.results),
        !loading && console.log(JSON.stringify(facet))
      );
  };
  const renderLabel = (label) => (
    <Text style={styles.checkboxText}>
      {typeof transform === "function" ? transform(label) : label}
    </Text>
  );
  const getFacetOptions = () => {
    if (facet) {
      console.log(JSON.stringify(facet));
      return facet.options.map((option) => option.displayName);
    } else {
      return [];
    }
  };
  const onFacetSelection = (inp) => {
    console.log(JSON.stringify(inp));
  };
  return (
    <View>
      <TextInput
        style={styles.textInp}
        value={queryTerm}
        onChangeText={(text) => setQueryTerm(text)}
      />
      {facet.length && (
        <SelectMultiple
          rowStyle={styles.rowStyle}
          labelStyle={styles.checkboxText}
          renderLabel={renderLabel}
          items={getFacetOptions()}
          selectedItems={
            facet?.options
              .filter((option) => option.selected === true)
              .map((option) => option.displayName) || []
          }
          onSelectionsChange={(selectedItems) =>
            onFacetSelection(selectedItems)
          }
        />
      )}
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
