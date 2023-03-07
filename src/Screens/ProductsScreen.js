import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect, useState, useMemo } from "react";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import { useIsFocused } from "@react-navigation/native";

const ProductsScreen = ({ navigation }) => {
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const focus = useIsFocused(); // useIsFocused as shown

  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);
  const [initItem, setInitItem] = useState();
  const { productResults, setProductResults, facets, setFacets } =
    useProductsContext();

  useEffect(() => {
    if (focus) {
      setFacets([]);
      searchActions.setVertical("products");
      searchActions.executeVerticalQuery().then((res) => {
        setResults(res.verticalResults.results),
          setLoading(false),
          setInitItem(res.verticalResults.results[0]);
      });
    }
  }, [focus]);

  const facet = useSearchState((state) => state.filters.facets);

  useEffect(() => {
    facet &&
      !facets &&
      facet.map((item) => setFacets((facet) => [...facet, item.displayName]));
  }, [facet]);
  useEffect(() => {
    console.log(JSON.stringify(facets));
  }, [facets]);
  return (
    <>
      {!loading && (
        <View style={{ backgroundColor: "white" }}>
          <SearchBar verticalKey="products" />
          {results && (
            <View style={styles.resultsSection}>
              <FlatList
                numColumns={2}
                data={results}
                columnWrapperStyle={{ justifyContent: "space-evenly" }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => pressHandler(item.id)}>
                    <View style={{ width: width / 2 }}>
                      <ProductResultCard data={item} />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexBasis: 100,
  },
  resultsSection: {
    zIndex: -1,
  },
});
