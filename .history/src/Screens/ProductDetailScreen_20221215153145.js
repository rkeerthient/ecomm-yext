import * as React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useProductsContext } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import star from "../../assets/star";
import { SvgXml } from "react-native-svg";

const ProductDetailScreen = (props) => {
  const { productResults } = useProductsContext();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
  const ratingArray = Array.from(new Array(Math.ceil(5)));
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
          <View style={styles.detailsContainer}>
            <Text style={styles.titleText}>{data.name}</Text>
            <Text style={styles.priceText}>${data.price.value}</Text>
          </View>
          <View style={styles.rating}>
            {ratingArray.map((item, index) => (
              <SvgXml key={index} xml={star} width={20} height={20} />
            ))}
          </View>
          <View>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
            animi commodi ab in cum natus, distinctio accusantium praesentium
            deserunt dignissimos porro provident temporibus exercitationem sunt
            eligendi consequatur eum neque quas.
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
  image: {
    height: 400,
    width: 400,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: { fontSize: 20 },
  priceText: { fontWeight: "bold", fontSize: 20 },
  rating: {
    paddingHorizontal: 10,
    flexDirection: "row",
    paddingVertical: 8,
  },
});
