import { useSearchActions } from "@yext/search-headless-react";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Dimensions } from "react-native";
import "react-native-url-polyfill/auto";
import { useProductsContext } from "../context/ProductsContext";
import { FacetDrawer } from "./Facets";
import { List } from "react-native-paper";
import VertTabs from "./VertTabs";

const { width, height } = Dimensions.get("window");

export const SearchBar = ({ verticalKey }) => {
  const [hideAutoComplete, setHideAutoComplete] = useState(false);
  const [queryTerm, setQueryTerm] = useState("");
  const searchActions = useSearchActions();
  const { productResults, setProductResults } = useProductsContext();
  const [showFacetDrawer, setShowFacetDrawer] = useState(false);
  const handleSearch = () => {
    searchActions.setQuery(queryTerm);
    searchActions.setVertical(verticalKey);
    searchActions
      .executeVerticalQuery()
      .then((res) => setProductResults(res.verticalResults.results));
  };
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  console.log(productResults);
  return (
    <View>
      {productResults && (
        <Button
          title="Facets"
          onPress={() => setShowFacetDrawer(!showFacetDrawer)}
        ></Button>
      )}
      <View style={{ zIndex: -1 }}>
        <Button
          style={{ borderWidth: 1 }}
          title="Press me"
          onPress={handleSearch}
        />
        <TextInput
          style={styles.textInp}
          value={queryTerm}
          onChangeText={(text) => setQueryTerm(text)}
        />
        {showFacetDrawer && (
          <View style={styles.filtersContainer}>
            <VertTabs facets={["Department", "Category"]}></VertTabs>
          </View>
        )}
      </View>
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
    height: Dimensions.get("window").height,
    // flex: 1,
    // flexDirection: "column",
    // marginHorizontal: 18,
    // minHeight: 5,
    justifyContent: "center",
    zIndex: 2,
    // marginTop: 100,
    // flexBasis: 100,
    // overflow: "auto",
  },
  facetContainer: {
    marginBottom: 25,
    height: 140,
  },
});
