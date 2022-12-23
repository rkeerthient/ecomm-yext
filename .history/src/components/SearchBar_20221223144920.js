import { useSearchActions } from "@yext/search-headless-react";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import "react-native-url-polyfill/auto";
import { useProductsContext } from "../context/ProductsContext";
import { FacetDrawer } from "./Facets";

export const SearchBar = ({ verticalKey }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const { setProductResults } = useProductsContext();
  const [showFacetDrawer, setShowFacetDrawer] = useState(false);
  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions.setVertical(verticalKey);
    searchActions
      .executeVerticalQuery()
      .then((res) => setProductResults(res.verticalResults.results));
  };

  return (
    <View>
      <Button onPress={() => setShowFacetDrawer(true)}></Button>
      <TextInput
        style={styles.textInp}
        value={queryTerm}
        onChangeText={(text) => setQueryTerm(text)}
      />
      {showFacetDrawer && (
        <View style={styles.filtersContainer}>
          <FacetDrawer
            filterName={"Department"}
            displayName={"Department"}
            transform={""}
          />
          <FacetDrawer
            filterName={"Category"}
            displayName={"Category"}
            transform={""}
          />
        </View>
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
  filtersContainer: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 18,
    height: 30,
    justifyContent: "center",
    zIndex: 2,
  },
});
