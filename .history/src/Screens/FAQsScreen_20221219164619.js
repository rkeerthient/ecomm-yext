import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
import { List } from "react-native-paper";
import MarkdownView from "react-showdown";

const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results),
        // setLoading(false),
        console.log(JSON.stringify(res));
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
                  expanded={expanded}
                  onPress={handlePress}
                >
                  {/* <List.Item
                    title={`${(
                      <MarkdownView
                        markdown={item.rawData.answer}
                      ></MarkdownView>
                    )}`}
                  ></List.Item> */}
                  <List.Item
                    titleStyle={{ width: "50%" }}
                    title={item.rawData.answer}
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
