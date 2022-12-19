import * as React from "react";
import { Text, View } from "react-native";
const FAQsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("locations");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results),
        setLoading(false),
        setInitItem(res.verticalResults.results[0]);
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>FAQs!</Text>
    </View>
  );
};

export default FAQsScreen;
