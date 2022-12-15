import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect } from "react";

const ProductDetailScreen = () => {
  const { productResults } = useProductsContext();
  useEffect(() => {
    // if (props.navigation.getParam("myData")) {
    //   setData(myData);
    //   setModalShow(true);
    // }
    console.log(JSON.stringify(data));
  }, [data]);
  
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text></Text>
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
