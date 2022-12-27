import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const VertTabs = () => {
  const [facetGroup, setFacetGroup] = useState([
    { name: "tab 1", index: 1, description: "tab one description" },
    { name: "tab 2", index: 2, description: "tab two description" },
    { name: "tab 3", index: 3, description: "tab three description" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handlePress = (index) => {
    setSelectedIndex(index);
  };
  return (
    <View>
      {facetGroup.map((item: any) => (
        <View key={item.index} style={styles.mainContainer}>
          <TouchableOpacity onPress={() => handlePress(item.index)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
          <View>
            {selectedIndex === item.index && <Text>{item.description}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
};

export default VertTabs;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexBasis: 100,
  },
  resultsSection: {
    zIndex: -1,
  },
});
