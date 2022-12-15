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
      {results.length && (
        <View style={styles.container}>
          <Text>{results[0].rawData.name}</Text>
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
