import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import AccordionItem from "../components/AccordionItem";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useSearchActions } from "@yext/search-headless-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setisLoading_disp,
  setResetState_disp,
  setResults_disp,
} from "../features/SearchbarSlice";

const FAQsScreen = () => {
  const focus = useIsFocused();
  const { isLoading_disp, results_disp } = useSelector(
    (state) => state.searchReducer
  );
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    if (focus) {
      dispatch(setResetState_disp());
      searchActions.setVertical("faqs");
      searchActions.executeVerticalQuery().then((res) => {
        res && dispatch(setResults_disp(res.verticalResults.results));
      });
    }
  }, [focus]);
  return (
    <>
      {!isLoading_disp && results_disp ? (
        <View style={styles.container}>
          <FlatList
            numColumns={1}
            data={results_disp}
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
