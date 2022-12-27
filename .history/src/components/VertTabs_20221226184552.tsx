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
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: "column" }}>
        {facetGroup.map((item: any) => (
          <View key={item.index} style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handlePress(item.index)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        {facetGroup.map((item: any) => (
          <View key={item.index} style={styles.descContainer}>
            <View style={{ marginLeft: 40 }}>
              {selectedIndex === item.index && <Text>{item.description}</Text>}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default VertTabs;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    height: 500,
  },
  menuContainer: {
    textAlign: "center",
    height: 20,
    padding: 20,
    border: "1px solid black",
  },
  descContainer: {
    backgroundColor: "#fff",
    marginTop: 0,
    justifyContent: "flex-start",
  },
});
