import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const LocationsScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

export default LocationsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
