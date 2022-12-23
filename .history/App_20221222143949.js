import * as React from "react";
import { config } from "./src/config/searchConfig";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Navigation from "./src/config/Navigation";
import { ProductsProvider } from "./src/context/ProductsContext";
import { SafeAreaView, StyleSheet } from "react-native";
export default function App() {
  const searcher = provideHeadless(config);
  return (
    <SafeAreaView style={styles.container}>
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
