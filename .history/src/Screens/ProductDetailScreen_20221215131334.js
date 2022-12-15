import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useProductsContext } from "../context/ProductsContext";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect } from "react";

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
      {!isLoading && (
        <View style={{ backgroundColor: "white" }}>
          <Text></Text>
        </View>
      )}
    </>
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
