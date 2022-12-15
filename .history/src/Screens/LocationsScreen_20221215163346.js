import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const LocationsScreen = () => {
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setQuery("locationsƒ");
    searchActions.setVertical(verticalKey);
    searchActions
      .executeVerticalQuery()
      .then((res) => console.log(JSON.stringify(res)));
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          pinColor="#ab7a5f"
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default LocationsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
