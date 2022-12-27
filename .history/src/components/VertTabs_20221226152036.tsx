import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const VertTabs = () => {
  const [facetGroup, setFacetGroup] = useState([
    { name: "tab 1", index: 1, description: "tab one description" },
    { name: "tab 2", index: 2, description: "tab two description" },
    { name: "tab 3", index: 3, description: "tab three description" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handlePress = () => {};
  return (
    <View>
      {facetGroup.map((item: any) => (
        <View key={item.index}>
          <TouchableOpacity onPress={() => handlePress(item.id)}>
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
