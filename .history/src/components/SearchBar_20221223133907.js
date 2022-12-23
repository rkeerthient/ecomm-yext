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
import { useProductsContext } from "../context/ProductsContext";
import SelectMultiple from "@horizonlime/react-native-select-multiple";
import { FacetDrawer } from "./Facets";

const { width, height } = Dimensions.get("window");
export const SearchBar = ({ verticalKey }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const { setProductResults } = useProductsContext();
  const [facetSet, isFacetSet] = useState(false);
  const [selectedFruits, setSelectedFruits] = useState([]);

  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then((res) => {
      setProductResults(res.verticalResults.results);
    });
  };

  return (
    <>
      {
        <View>
          <TextInput
            style={styles.textInp}
            value={queryTerm}
            onChangeText={(text) => setQueryTerm(text)}
          />
          <View style={styles.filtersContainer}>
            <FacetDrawer
              filterName={"Types Name"}
              displayName={"Types"}
              transform={""}
            />
          </View>
          {/* <SelectMultiple
        items={getFacetOptions}
        selectedItems={selectedFruits}
        onSelectionsChange={onSelectionsChange}
      /> */}
          <Button
            style={{ borderWidth: 1 }}
            title="Press me"
            onPress={handleSearch}
          />
        </View>
      }
    </>
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
