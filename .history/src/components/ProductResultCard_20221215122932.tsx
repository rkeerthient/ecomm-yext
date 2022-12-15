import { Text, StyleSheet, View, Image } from "react-native";
const ProductResultCard = ({ data }) => {
  return (
    <View style={styles.item}>
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: data.rawData.primaryPhoto.image.url }}
          style={styles.image}
        ></Image>
      </View>
      <Text style={{ marginTop: 8 }}>{data.name}</Text>
    </View>
  );
};

export default ProductResultCard;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  imgContainer: {
    flexDirection: "row",
  },
  image: {
    height: 250,
    flex: 1,
  },
});
