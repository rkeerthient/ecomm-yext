import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
import AccordionItem from "../components/AccordionItem";

const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results);
    });
  }, []);

  return (
    <>
      {
        <View style={styles.container}>
          <FlatList
            numColumns={1}
            data={results}
            renderItem={({ item }) => (
              <AccordionItem
                key={item.id}
                style={{ color: "white" }}
                title={item.rawData.question}
              >
                <Text style={styles.textSmall}>{item.rawData.answer}</Text>
              </AccordionItem>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      }
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
