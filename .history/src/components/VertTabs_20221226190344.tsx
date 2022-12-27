import { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FacetDrawer } from "./Facets";
const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height - 40;

const VertTabs = (props: any) => {
  console.log(props);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const handlePress = (index) => {
    setSelectedIndex(index);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: "column" }}>
        {facets.map((item: any, index: number) => (
          <View key={index} style={styles.menuContainer}>
            <TouchableOpacity onPress={() => handlePress(index)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        {facets.map((item: any, index: number) => (
          <View key={index} style={styles.descContainer}>
            <View style={{ marginLeft: 40 }}>
              {selectedIndex === index && (
                <FacetDrawer filterName={item}></FacetDrawer>
              )}
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
    width: width,
    padding: 20,
  },
  menuContainer: {
    textAlign: "center",
    height: 30,
    borderColor: "black",
    padding: 5,
    borderWidth: 1,
  },
  descContainer: {
    backgroundColor: "#fff",
    marginTop: 0,
    justifyContent: "flex-start",
  },
});
