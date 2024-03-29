import React, { useState } from "react";
import { StyleSheet, TextInput, View, Dimensions } from "react-native";
import "react-native-url-polyfill/auto";
import { useDispatch, useSelector } from "react-redux";
import VertTabs from "./VertTabs";
import { setSearchTerm_disp } from "../features/SearchbarSlice";
import { useEffect } from "react";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [queryTerm, setQueryTerm] = useState("");
  const [showFacetDrawer, setShowFacetDrawer] = useState(false);
  const { searchTerm_disp } = useSelector((state) => state.searchReducer);
  const handleSearch = (data) => {
    dispatch(setSearchTerm_disp(data));
  };
  useEffect(() => {
    searchTerm_disp == "" && setQueryTerm("");
  }, [searchTerm_disp]);

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
