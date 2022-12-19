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
  const handlePress = () => setExpanded(!expanded);

  return (
    <>
      {
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <List.Section title="">
            <List.Accordion
              title="Uncontrolled Accordion"
              left={(props) => <List.Icon {...props} />}
            >
              <List.Item title="First item" />
            </List.Accordion>
          </List.Section>{" "}
        </View>
      }
    </>
  );
};

export default FAQsScreen;
