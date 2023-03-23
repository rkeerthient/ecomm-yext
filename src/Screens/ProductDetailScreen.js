import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useProductsContext } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import star from "../../assets/star";
import { SvgXml } from "react-native-svg";
import Icon from "react-native-vector-icons/Octicons";

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
        <ScrollView style={{ backgroundColor: "white" }}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${data.primaryPhoto.image.url}` }}
            ></Image>
          </View>
          <View style={styles.detailsWrapper}>
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
              <Text style={styles.prodDesc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                animi commodi ab in cum natus, distinctio accusantium
                praesentium deserunt dignissimos porro provident temporibus
                exercitationem sunt eligendi consequatur eum neque quas.
              </Text>
            </View>

            <View style={{ marginTop: 10, flexDirection: "column", gap: 15 }}>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "lightgray",
                  marginVertical: 5,
                }}
              />
              <Text style={styles.attibutesText}>
                <Text style={styles.boldText}>Product Details</Text>
              </Text>
              <Text style={styles.attibutesText}>
                <Text style={styles.boldText}>For:</Text>
                <Text style={styles.attributeValue}>{data.c_department}</Text>
              </Text>
              <Text style={styles.attibutesText}>
                <Text style={styles.boldText}>Type:</Text>
                <Text style={styles.attributeValue}>
                  {data.c_productCategory}
                </Text>
              </Text>
              <Text style={styles.attibutesText}>
                <Text style={styles.boldText}>Category:</Text>
                <Text style={styles.attributeValue}>{data.c_cCategory}</Text>
              </Text>
              <View style={styles.colors}>
                <Text style={styles.boldText}>Colors: </Text>
                <View>
                  {data?.c_color.map((color, index) => {
                    return (
                      <Pressable className="color-btn" key={index}>
                        <Icon
                          name="check-circle-fill"
                          size={24}
                          color={color.toLowerCase()}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
  detailsWrapper: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: "50%",
    backgroundColor: "white",
  },
  prodDesc: {
    fontSize: 15,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleText: { fontSize: 30 },
  priceText: { fontWeight: "bold", fontSize: 20 },
  rating: {
    flexDirection: "row",
    paddingVertical: 8,
    marginBottom: 10,
  },
  attibutesText: {
    marginVertical: 5,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  boldText: {
    fontWeight: "500",
    fontSize: 15,
  },
  attributeValue: {
    fontWeight: "500",
    fontSize: 15,
  },
  colors: {
    display: "flex",
    marginBottom: 5,
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
});
