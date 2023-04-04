import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import SelectMultiple from "@horizonlime/react-native-select-multiple";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { useEffect } from "react";

const FacetsSection = () => {
  const { facets_disp } = useSelector((state) => state.searchReducer);
  const [selected, setSelected] = useState(0);
  const [currData, setCurrData] = useState([]);
  useEffect(() => {
    let z = facets_disp[0].options.map((item) => {
      return {
        label: `${item.displayName}(${item.count})`,
        value: `${item.displayName.replace(" ", "")}`,
      };
    });
    setCurrData(z);
  }, []);

  const handlePress = (data) => {
    var x = facets_disp.filter((item) => {
      return item.displayName === data;
    });
    let z = x[0].options.map((item) => {
      return {
        label: `${item.displayName}(${item.count})`,
        value: `${item.displayName.replace(" ", "")}`,
      };
    });
    setCurrData(z);
  };
  return (
    <View>
      {facets_disp && (
        <View style={styles.sectionContainer}>
          <View style={styles.allCategories}>
            {facets_disp.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handlePress(item.displayName);
                  setSelected(index);
                }}
                style={[
                  styles.titleContainer,
                  index === selected && {
                    backgroundColor: "white",
                  },
                ]}
              >
                <Text>{item.displayName}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <SelectMultiple style={styles.listContainer} items={currData} />
        </View>
      )}
    </View>
  );
};

export default FacetsSection;

const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "95%",
  },
  allCategories: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#D3D3D3",
  },
  titleContainer: {
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  listContainer: {
    alignSelf: "flex-start",
    height: "100%",
    // width: "auto",
    // paddingRight: 25,
  },
});
