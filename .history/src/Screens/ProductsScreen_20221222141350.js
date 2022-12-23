import * as React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";

const ProductsScreen = ({ navigation }) => {
  const { productResults } = useProductsContext();
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchBar verticalKey="products" />
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
    // flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
});
