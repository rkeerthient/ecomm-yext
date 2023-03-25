import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import "react-native-url-polyfill/auto";
import { useDispatch, useSelector } from "react-redux";
import { FacetDrawer } from "./Facets";
import VertTabs from "./VertTabs";
import { setSearchTerm_disp } from "../features/SearchbarSlice";

export const SearchBar = ({ verticalKey }) => {
  const dispatch = useDispatch();
  const [queryTerm, setQueryTerm] = useState("");
  const [showFacetDrawer, setShowFacetDrawer] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const facet = useSearchState((state) => state.filters.facets);
  const { verticalKey_disp, searchTerm, results } = useSelector(
    (state) => state.searchReducer
  );
  const handleSearch = (data) => {
    dispatch(setSearchTerm_disp(data));
    console.log(verticalKey_disp);
  };

  // useEffect(() => {
  //   facet.length &&
  //     facet.map((item) => setFacets([...facets], item.displayName));
  // }, [facet]);
  // useEffect(() => {
  //   console.log(JSON.stringify(facets));
  // }, [facets]);

  return (
    <View>
      <View style={{ zIndex: -1, width: 250 }}>
        <TextInput
          style={styles.textInp}
          value={queryTerm}
          onChangeText={(text) => setQueryTerm(text)}
          placeholder="Search"
          onBlur={() => handleSearch(queryTerm)}
          enablesReturnKeyAutomatically
        />
        {showFacetDrawer && (
          <View style={styles.filtersContainer}>
            <VertTabs facets={["Department", "Category"]}></VertTabs>
          </View>
        )}
      </View>
      {/* {productResults.length >= 1 && (
        <Button
          title="Facets"
          onPress={() => setShowFacetDrawer(!showFacetDrawer)}
        ></Button>
      )} */}
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
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInp: {
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f3",
  },
  filtersContainer: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
    zIndex: 2,
  },
  facetContainer: {
    marginBottom: 25,
    height: 140,
  },
});
