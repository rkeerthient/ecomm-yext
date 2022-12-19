import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
import { List } from "react-native-paper";
const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results),
        setLoading(false),
        console.log(JSON.stringify(res));
    });
  }, []);
  return (
    <>
      {
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>FAQs!</Text>
        </View>
      }
    </>
  );
};

export default FAQsScreen;
