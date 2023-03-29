import * as React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ProductResultCard from "../components/ProductResultCard";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setResetState_disp,
  setVerticalKey_disp,
  setLoadMore_disp,
} from "../features/SearchbarSlice";
import Loading from "../components/Loading";

const ProductsScreen = ({ navigation, route }) => {
  const { params } = route;
  const width = Dimensions.get("window").width - 40;
  const pressHandler = (id) => {
    navigation.navigate("ProductDetailScreen", { id: id });
  };
  const { isLoading_disp, results_disp } = useSelector(
    (state) => state.searchReducer
  );
  const dispatch = useDispatch();
  const focus = useIsFocused(); // useIsFocused as shown
  useEffect(() => {
    if (focus) {
      dispatch(setResetState_disp());
      dispatch(setVerticalKey_disp(params.verticalKey));
    }
  }, [focus]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <>
      {isLoading_disp ? (
        <Loading />
      ) : (
        <View style={{ backgroundColor: "white" }}>
          {results_disp && (
            <View style={styles.resultsSection}>
              <FlatList
                onMomentumScrollEnd={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    dispatch(setLoadMore_disp(true));
                  }
                }}
                scrollEventThrottle={400}
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
