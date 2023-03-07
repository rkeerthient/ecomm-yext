import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
import { List } from "react-native-paper";

const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results);
    });
  }, []);
  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      {
        <View style={{ flex: 1 }}>
          <ScrollView>
            {results.map((item, index) => {
              return (
                <List.Accordion
                  key={index}
                  title={item.rawData.question}
                  onPress={handlePress}
                >
                  <List.Item
                    titleNumberOfLines={25}
                    title={
                      <Text style={{ color: "black" }}>
                        {item.rawData.answer}
                      </Text>
                    }
                  ></List.Item>
                </List.Accordion>
              );
            })}
          </ScrollView>
        </View>
      }
    </>
  );
};

export default FAQsScreen;
