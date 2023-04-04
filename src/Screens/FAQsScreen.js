import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import AccordionItem from "../components/AccordionItem";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setResetState_disp,
  setVerticalKey_disp,
  setLoadMore_disp,
} from "../features/SearchbarSlice";
import BottomContainer from "../components/BottomContainer";
import { FlatList } from "react-native-gesture-handler";

const FAQsScreen = ({ route }) => {
  const { params } = route;

  const focus = useIsFocused();
  const { isLoading_disp, results_disp } = useSelector(
    (state) => state.searchReducer
  );
  const dispatch = useDispatch();
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
      {!isLoading_disp && results_disp ? (
        <>
          <View style={styles.container}>
            <FlatList
              estimatedItemSize={75}
              onMomentumScrollEnd={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  dispatch(setLoadMore_disp(true));
                }
              }}
              scrollEventThrottle={400}
              numColumns={1}
              data={results_disp}
              style={{ flexBasis: 0.8 }}
              renderItem={({ item }) => (
                <AccordionItem
                  key={item.id}
                  style={{ color: "white" }}
                  title={item.rawData.question}
                  answer={item.rawData.answer}
                >
                  <Text style={styles.textSmall}>{item.rawData.answer}</Text>
                </AccordionItem>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <BottomContainer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FAQsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 5,
    justifyContent: "flex-start",
  },
});
