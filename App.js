import "react-native-gesture-handler";
import * as React from "react";
import { config } from "./src/config/searchConfig";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Navigation from "./src/config/Navigation";
import { ProductsProvider } from "./src/context/ProductsContext";
import { SafeAreaView, StyleSheet, Image } from "react-native";
export default function App() {
  const searcher = provideHeadless(config);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("./assets/logo.png")}
        style={{ height: 100, width: 100 }}
      />

      <SearchHeadlessProvider searcher={searcher}>
        <ProductsProvider>
          <Navigation />
        </ProductsProvider>
      </SearchHeadlessProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
