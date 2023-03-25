import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import AccordionItem from "../components/AccordionItem";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useSearchActions } from "@yext/search-headless-react";
import { useState, useEffect } from "react";

const FAQsScreen = () => {
  const focus = useIsFocused();
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    if (focus) {
      searchActions.setVertical("faqs");
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
