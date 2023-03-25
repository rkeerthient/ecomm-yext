import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../features/SearchbarSlice";
import Loading from "../components/Loading";
import { useSearchActions } from "@yext/search-headless-react";
import { useState } from "react";

const ProductsScreen = ({ navigation, route }) => {
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const dispatch = useDispatch();
  const focus = useIsFocused(); // useIsFocused as shown
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    if (focus) {
      searchActions.setVertical("products");
      searchActions.executeVerticalQuery().then((res) => {
        setResults(res.verticalResults.results);
      });
    }
  }, [focus]);

  return (
    <>
      {results.length <= 0 ? (
        <Loading />
      ) : (
        <View style={{ backgroundColor: "white" }}>
          {results && (
            <View style={styles.resultsSection}>
              <FlatList
                onEndReached={() => loadMoreProducts()}
                numColumns={2}
                data={results}
                columnWrapperStyle={{ justifyContent: "space-evenly" }}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => pressHandler(item.id)}>
                    <View style={{ width: width / 2 }}>
                      <ProductResultCard data={item} />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexBasis: 100,
  },
  resultsSection: {
    zIndex: -1,
  },
});
