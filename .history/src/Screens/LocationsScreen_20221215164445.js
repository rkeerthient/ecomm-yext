import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const LocationsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("locations");
    searchActions
      .executeVerticalQuery()
      .then((res) => setResults(res.verticalResults.results));
  }, []);
  return (
    <>
      {" "}
      {results && (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: results[0].rawData.geocodedCoordinate.latitude,
              longitude: results[0].rawData.geocodedCoordinate.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {results.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.rawData.geocodedCoordinate.latitude,
                  longitude: item.rawData.geocodedCoordinate.longitude,
                }}
                pinColor="#ab7a5f"
              >
                <Callout>
                  <Text>I'm here</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </>
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
