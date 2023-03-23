import { Link } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { widthToDp, heightToDp } from "rn-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";

const FeaturedProducts = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const Item = (item) => {
    return (
      <TouchableOpacity
        style={styles.prodCard}
        onPress={() => pressHandler(item.data.meta.id)}
      >
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: item.data.primaryPhoto.image.url,
            }}
            style={styles.prodImage}
          />
        </View>

        <View style={styles.prodTextContainer}>
          <Text style={styles.prodTitle}>{item.data.name}</Text>
          <Text style={styles.prodPrice}>${item.data.price.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const fetchFeaturedProducts = async () => {
    setIsLoading(true);
    try {
      const responseData = await fetch(
        `https://liveapi-sandbox.yext.com/v2/accounts/me/entities?api_key=8a7b1b2d11c99bd6cd676dc3b9ff4a65&v=20220101&entityTypes=product&filter={"c_featuredProduct": {"$eq": true}}`
      );
      const responseJson = await responseData.json();
      setIsLoading(false);
      setData(await responseJson.response.entities);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <>
      {!isLoading && data && (
        <View style={styles.container}>
          <Text style={styles.title}>Featured Products</Text>
          <View style={styles.underline}></View>
          <View style={styles.fpContainer}>
            {data.map((item, index) => {
              return (
                <View key={index}>
                  <Item data={item} />
                </View>
              );
            })}
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Shop now</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default FeaturedProducts;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    marginTop: 50,
  },
  title: {
    textTransform: "capitalize",
    marginBottom: 5,
    color: "black",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  underline: {
    height: 2,
    alignSelf: "center",
    width: 95,
    backgroundColor: "#ab7a5f",
  },
  fpContainer: {
    marginTop: 20,
  },
  prodContainer: {
    flexDirection: "column",
  },

  prodCard: {
    padding: 4,
    marginVertical: 10,
    "&:hover": {
      opacity: 0,
    },
  },
  prodTitle: {
    fontSize: 20,
    flex: 1,
  },
  prodImage: {
    height: heightToDp(70),
    borderRadius: 7,
    marginBottom: heightToDp(2),
  },
  prodTextContainer: {
    flexDirection: "row",
  },
  prodPrice: {
    fontSize: 18,
    color: "#ab7a5f",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ab7a5f",
    marginTop: 10,
    marginHorizontal: 15,
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 18,
    textTransform: "uppercase",
    color: "white",
  },
  container: {
    position: "relative",
    background: "black",
    borderRadius: 5,
  },
  img: {
    height: 255,
    width: "100%",
    display: "block",
    objectFit: "cover",
    borderRadius: 5,
  },
  link: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%'
    // transform: translate(-50%, -50%);
    // background: var(--clr-primary-5);
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // width: 2.5rem;
    // height: 2.5rem;
    // border-radius: 50%;
    // transition: var(--transition);
    // opacity: 0;
    // cursor: pointer;
    svg: {
      //   font-size: 1.25rem;
      //   color: var(--clr-white);
    },
  },
});
