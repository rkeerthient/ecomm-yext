import * as React from "react";
import { config } from "./src/config/searchConfig";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import Navigation from "./src/config/Navigation";
import { ProductsProvider } from "./src/context/ProductsContext";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const searcher = provideHeadless(config);
  return (
    <SafeAreaView>
      <SearchHeadlessProvider searcher={searcher}>
        <ProductsProvider>
          <Navigation />
        </ProductsProvider>
      </SearchHeadlessProvider>
    </SafeAreaView>
  );
}

