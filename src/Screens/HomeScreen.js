import * as React from "react";
import { Text, StyleSheet, View, Pressable, ScrollView } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import FeaturedProducts from "../components/HomePageComponents/FeaturedProducts";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Ready, Set, Summer</Text>
          <Text style={styles.subTitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
            sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
            aperiam odio ducimus, obcaecati libero et quia tempora excepturi
            quis alias?
          </Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Shop now</Text>
          </Pressable>
        </View>
        <FeaturedProducts />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    justifyContent: "start",
    alignSelf: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 55,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 15,
  },
  shopNow: {
    color: "red",
    borderWidth: 3,
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ab7a5f",
    marginTop: 10,
    // width: "fit-content",flexBasis: auto
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 18,
    textTransform: "uppercase",
    color: "white",
  },
});
