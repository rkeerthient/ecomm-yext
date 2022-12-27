import { useState } from "react";
import { View } from "react-native";

const VertTabs = () => {
  const [facetGroup, setFacetGroup] = useState([
    { name: "tab 1", index: 1, description: "tab one description" },
    { name: "tab 2", index: 2, description: "tab two description" },
    { name: "tab 3", index: 3, description: "tab three description" },
  ]);

  return <View></View>;
};

export default VertTabs;
