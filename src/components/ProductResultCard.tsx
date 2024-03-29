import { Text, StyleSheet, View, Image, Button } from "react-native";
import { widthToDp, heightToDp } from "rn-responsive-screen";

const ProductResultCard = ({ data }) => {
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
      )}
    </>
  );
};

export default ProductResultCard;

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
  },
  image: {
    height: heightToDp(40),
    borderRadius: 7,
    marginBottom: heightToDp(2),
    // height: "auto",
  },
  title: {
    paddingTop: 15,
    fontSize: widthToDp(3.7),
    fontWeight: "bold",
    minHeight: 45,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  prodImage: {
    height: heightToDp(40),
    borderRadius: 7,
    marginBottom: heightToDp(2),
    // height: "auto",
  },
});
