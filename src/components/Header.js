import React from "react";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { StyleSheet, Image, View } from "react-native";
import { SearchBar } from "./SearchBar";
import { useState } from "react";

import useSearch from "../util/useSearch";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  useSearch();
  return (
    <>
      <View style={styles.header}>
        <View style={{ width: "25%" }}>
          <Image
            source={require("../../assets/logo.jpg")}
            style={{
              height: 70,
              width: 120,
              marginLeft: -20,
            }}
          />
        </View>
        <View style={styles.icons}>
          {isOpen && (
            <SearchBar verticalKey="products" style={styles.searchBar} />
          )}
          {!isOpen && (
            <EvilIcons.Button
              name={"search"}
              size={28}
              color="black"
              backgroundColor="white"
              onPress={() => setIsOpen(true)}
            />
          )}
          <EvilIcons name={"cart"} size={28} color="black" />
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </>
  );
}

export default Header;
const styles = StyleSheet.create({
  header: {
    marginTop: -5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    height: 60,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 7,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "65%",
  },
});
