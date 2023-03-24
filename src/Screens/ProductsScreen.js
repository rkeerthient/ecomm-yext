import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setVerticalKey_disp,
  setSearchTerm_disp,
  setResults_disp,
} from "../features/SearchbarSlice";
import Loading from "../components/Loading";

const ProductsScreen = ({ navigation }) => {
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const focus = useIsFocused(); // useIsFocused as shown
  const dispatch = useDispatch();

  const { isLoading_disp, results } = useSelector(
    (state) => state.searchReducer
  );
  useEffect(() => {
    if (focus) {
      dispatch(setResults_disp([]));
      dispatch(setVerticalKey_disp("products"));
      dispatch(setSearchTerm_disp(""));
    }
  }, [focus]);

  // useEffect(() => {
  //   facet &&
  //     !facets &&
  //     facet.map((item) => setFacets((facet) => [...facet, item.displayName]));
  // }, [facet]);
  // useEffect(() => {
  //   console.log(JSON.stringify(facets));
  // }, [facets]);

  // const facet = useSearchState((state) => state.filters.facets);

  return (
    <>
      {!isLoading_disp && <Loading />}
      {isLoading_disp && (
        <View style={{ backgroundColor: "white" }}>
          {results && (
            <View style={styles.resultsSection}>
              <FlatList
                onEndReached={() => loadMoreProducts()}
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
