import {
  useSearchActions,
  useSearchState,
  useSearchUtilities,
} from "@yext/search-headless-react";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Dimensions, Button } from "react-native";
import styled from "styled-components/native";
import "react-native-url-polyfill/auto";
import { useProductsContext } from "../context/ProductsContext";

export const SearchBar = ({ verticalKey }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const { setProductResults } = useProductsContext();

  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions.setVertical(verticalKey);
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
      <FacetDrawer
        filterName={"Types Name"}
        displayName={"Types"}
        transform={""}
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
