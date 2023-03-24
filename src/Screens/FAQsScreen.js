import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import AccordionItem from "../components/AccordionItem";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setVerticalKey_disp,
  setSearchTerm_disp,
  setResults_disp,
} from "../features/SearchbarSlice";
import Loading from "../components/Loading";

const FAQsScreen = () => {
  const focus = useIsFocused(); // useIsFocused as shown
  const dispatch = useDispatch();

  const { isLoading_disp, results } = useSelector(
    (state) => state.searchReducer
  );

  useEffect(() => {
    if (focus) {
      dispatch(setResults_disp([]));
      dispatch(setVerticalKey_disp("faqs"));
      dispatch(setSearchTerm_disp(""));
    }
  }, [focus]);

  return (
    <>
      {isLoading_disp && <Loading />}
      {!isLoading_disp && (
        <View style={styles.container}>
          <FlatList
            numColumns={1}
            data={results}
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
