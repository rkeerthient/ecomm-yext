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

const ProductsScreen = ({ navigation }) => {
  const { productResults } = useProductsContext();
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchBar verticalKey="products" />
      {productResults && (
        <View style={styles.resultsSection}>
          <FlatList
            numColumns={2}
            data={productResults}
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
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  resultsSection: {
    zIndex: -1,
    marginTop: 10,
  },
});