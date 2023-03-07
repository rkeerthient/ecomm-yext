import { Text, StyleSheet, View, Image, Button } from "react-native";
import { widthToDp, heightToDp } from "rn-responsive-screen";

const ProductResultCard = ({ data }) => {
  // console.log(JSON.stringify(data));
  return (
    <>
      {data.rawData.primaryPhoto && (
        <View style={styles.container}>
          <Image
            source={{
              uri: data.rawData.primaryPhoto.image.url,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.category}>{data.rawData.category}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${data.rawData.price.value}</Text>

            <Button title="BUY" />
          </View>
        </View>
        // <View style={styles.item}>
        //   <View style={styles.imgContainer}>
        //     <Image
        //       resizeMode="cover"
        //       source={{
        //         uri: data.rawData.primaryPhoto.image.url,
        //       }}
        //       style={styles.image}
        //     ></Image>
        //   </View>
        //   <View style={styles.textContainer}>
        //     <Text style={styles.title}>{data.name}</Text>
        //     <Text style={styles.price}>${data.rawData.price.value}</Text>
        //   </View>
        // </View>
      )}
    </>
  );
};

export default ProductResultCard;

const styles = StyleSheet.create({
  // item: {
  //   marginHorizontal: 10,
  //   marginTop: 24,
  //   fontSize: 24,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderWidth: 1,
  // },
  // imgContainer: {
  //   flexDirection: "row",
  // },
  // image: {
  //   height: heightToDp(40),
  //   borderRadius: 7,
  //   marginBottom: heightToDp(2),
  // },
  // textContainer: {
  //   marginTop: 20,
  //   alignItems: "center",
  //   flex: 1,
  // },
  // title: {
  //   fontWeight: "bold",
  // },
  // price: {
  //   marginTop: 5,
  //   marginBottom: 5,
  // },
  container: {
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: heightToDp(4),
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    width: widthToDp(42),
    backgroundColor: "#fff",
  },
  image: {
    height: heightToDp(40),
    borderRadius: 7,
    marginBottom: heightToDp(2),
    // height: "auto",
  },
  title: {
    fontSize: widthToDp(3.7),
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: heightToDp(3),
  },
  category: {
    fontSize: widthToDp(3.4),
    color: "#828282",
    marginTop: 3,
  },
  price: {
    fontSize: widthToDp(4),
    fontWeight: "bold",
  },
});
