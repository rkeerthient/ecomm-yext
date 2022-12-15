import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const LocationsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    searchActions.setVertical("locations");
    searchActions
      .executeVerticalQuery()
      .then(
        (res) => setResults(res.verticalResults.results),
        setLoading(false)
      );
  }, []);

  return (
    <>
      {!loading && results.length >= 1 && (
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
                  <Text>{item.rawData.name}</Text>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
              <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              height={50}
              style={styles.chipsScrollView}
              contentInset={{ // iOS only
                top:0,
                left:0,
                bottom:0,
                right:20
              }}
              contentContainerStyle={{
                paddingRight: Platform.OS === 'android' ? 20 : 0
              }}
            >
              {state.categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.chipsItem}>
                  {category.icon}
                  <Text>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
