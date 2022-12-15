import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect, useState } from "react";

const ProductDetailScreen = (props) => {
  const { productResults } = useProductsContext();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let id = props.route.params.id;
    id && fetchProduct();
  }, [props]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://liveapi-sandbox.yext.com/v2/accounts/3147081/entities/${props.route.params.id}?api_key=8a7b1b2d11c99bd6cd676dc3b9ff4a65&v=20220101`
      );
      const responseJson = await response.json();
      setData(await responseJson.response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && data && (
        <View style={{ backgroundColor: "white" }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${data.primaryPhoto.image.url}` }}
            ></Image>
          </View>
        </View>
      )}
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "col",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignContent: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
});
