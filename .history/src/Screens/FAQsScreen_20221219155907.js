import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useSearchActions } from "@yext/search-headless-react";
const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => {
      // setResults(res.verticalResults.results),
      //   setLoading(false),
      //   setInitItem(res.verticalResults.results[0]);
      console.log(JSON.stringify(res));
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FAQs!</Text>
    </View>
  );
};

export default FAQsScreen;
