import { useSearchActions } from "@yext/search-headless-react";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Dimensions } from "react-native";
import "react-native-url-polyfill/auto";
import { useProductsContext } from "../context/ProductsContext";
import { FacetDrawer } from "./Facets";
import { List } from "react-native-paper";

const { width, height } = Dimensions.get("window");

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
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <Button
        title="Facets"
        onPress={() => setShowFacetDrawer(!showFacetDrawer)}
      ></Button>
      <TextInput
        style={styles.textInp}
        value={queryTerm}
        onChangeText={(text) => setQueryTerm(text)}
      />
      {showFacetDrawer && (
        // <View style={styles.filtersContainer}>
        <List.Section title="Filters">
          <List.Accordion
            title="Department"
            left={(props) => <List.Icon {...props} icon="" />}
          >
            <FacetDrawer
              style={styles.facetContainer}
              filterName={"Department"}
              displayName={"Department"}
              transform={""}
            />
          </List.Accordion>

          <List.Accordion
            title="Category"
            left={(props) => <List.Icon {...props} icon="" />}
            expanded={expanded}
            onPress={handlePress}
          >
            <FacetDrawer
              style={styles.facetContainer}
              filterName={"Category"}
              displayName={"Category"}
              transform={""}
            />
          </List.Accordion>
        </List.Section>
        // </View>
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
    flexDirection: "column",
    marginHorizontal: 18,
    minHeight: 5,
    justifyContent: "center",
    zIndex: 1,
    marginTop: 100,
    height: "100%",
    flexBasis: 100,
  },
  facetContainer: {
    marginBottom: 25,
    height: 140,
  },
});
