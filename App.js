import { Provider, useSelector } from "react-redux";
import { store } from "./src/Store";
import "react-native-gesture-handler";
import * as React from "react";
import { config } from "./src/config/searchConfig";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Navigation from "./src/config/Navigation";
import Header from "./src/components/Header";
import { SafeAreaView, StyleSheet, Image, View } from "react-native";

export default function App() {
  const searcher = provideHeadless(config);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <SearchHeadlessProvider searcher={searcher}>
          <Header></Header>
          <Navigation />
        </SearchHeadlessProvider>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
