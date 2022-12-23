import { Text, StyleSheet, View, Image } from "react-native";
const ProductResultCard = ({ data }) => {
  return (
    <View style={styles.item}>
      {/* <View style={styles.imgContainer}> */}
      <Image
        resizeMode="contain"
        source={{ uri: data.rawData.primaryPhoto.image.url }}
        style={styles.image}
      ></Image>
      {/* </View> */}
      {/* <View style={styles.textContainer}> */}
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.price}>${data.rawData.price.value}</Text>
      {/* </View> */}
    </View>
  );
};

export default ProductResultCard;

const styles = StyleSheet.create({
  item: {
    marginHorizontal: "1%",
    marginTop: 24,
    fontSize: 24,
    // justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.75,
    width: "49%",
  },
  imgContainer: {
    flexDirection: "row",
  },
  image: {
    height: 150,
    width: 150,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    marginTop: 5,
    marginBottom: 5,
  },
});
