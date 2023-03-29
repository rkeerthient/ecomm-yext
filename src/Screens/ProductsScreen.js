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
import {
  setisLoading_disp,
  setResults_disp,
  setResetState_disp,
} from "../features/SearchbarSlice";
import Loading from "../components/Loading";
import { useSearchActions } from "@yext/search-headless-react";
import { useState } from "react";

const ProductsScreen = ({ navigation, route }) => {
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const { isLoading_disp, results_disp } = useSelector(
    (state) => state.searchReducer
  );
  const dispatch = useDispatch();
  const focus = useIsFocused(); // useIsFocused as shown
  const searchActions = useSearchActions();
  useEffect(() => {
    if (focus) {
      dispatch(setResetState_disp());
      searchActions.setVertical("products");
      searchActions.executeVerticalQuery().then((res) => {
        res && dispatch(setResults_disp(res.verticalResults.results));
      });
    }
  }, [focus]);

  return (
    <>
      {isLoading_disp ? (
        <Loading />
      ) : (
        <View style={{ backgroundColor: "white" }}>
          {results_disp && (
            <View style={styles.resultsSection}>
              <FlatList
                onEndReached={() => loadMoreProducts()}
                numColumns={2}
                data={results_disp}
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
