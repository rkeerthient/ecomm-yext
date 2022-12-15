import * as React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";

const ProductDetailScreen = () => {
  const { productResults } = useProductsContext();
  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchBar />
      {productResults && (
        <View>
          <FlatList
            numColumns={2}
            data={productResults}
            renderItem={({ item }) => <ProductResultCard data={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
