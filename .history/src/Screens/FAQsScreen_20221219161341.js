import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
import { List } from "react-native-paper";
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
        <View style={{ flex: 1, overflow: "scroll" }}>
          {results.map((item, index) => {
            return (
              <List.Accordion
                key={index}
                id={index}
                title={item.name}
                expanded={expanded}
                onPress={handlePress}
              >
                <List.Item title={item.rawData.answer} />
              </List.Accordion>
            );
          })}
        </View>
      }
    </>
  );
};

export default FAQsScreen;
