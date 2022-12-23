import {
  useSearchActions,
  useSearchUtilities,
  useSearchState,
} from "@yext/search-headless-react";
import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Dimensions, Button } from "react-native";
import { useProductsContext } from "../context/ProductsContext";
import { FacetDrawer } from "./Facets";

export const SearchBar = ({ verticalKey }) => {
  // const [queryTerm, setQueryTerm] = useState("");
  // const searchActions = useSearchActions();
  // const { setProductResults } = useProductsContext();

  // const handleSearch = () => {
  //   searchActions.setQuery(queryTerm);
  //   searchActions.setVertical(verticalKey);
  //   searchActions.executeVerticalQuery().then((res) => {
  //     setProductResults(res.verticalResults.results);
  //   });
  // };
  const answersActions = useSearchActions();
  const utils = useSearchUtilities();
  const query = useSearchState((state) => state.query.query);
  const autoCompleteResults = useSearchState(
    (state) =>
      state.vertical.autoComplete?.results.map((result) => result.value) || []
  );
  const verticalLimit = useSearchState((state) => state.vertical.limit);

  useEffect(() => {
    answersActions.setVerticalLimit(50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    verticalLimit === 50 && answersActions.executeVerticalQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verticalLimit]);

  useEffect(() => {
    answersActions.executeVerticalAutoComplete();
  }, [answersActions, query]);
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
