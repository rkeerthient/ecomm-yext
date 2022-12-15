import * as React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";

const ProductsScreen = () => {
  const { productResults } = useProductsContext();
  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchBar />
      {productResults && (
        <View>
          <FlatList
            numColumns={2}
            data={productResults}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => pressHandler(item.id)}>
                <ProductResultCard data={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
