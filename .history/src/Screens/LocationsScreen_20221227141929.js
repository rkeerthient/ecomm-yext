import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);
  const mapViewRef = useRef(null);
  const [initItem, setInitItem] = useState();
  useEffect(() => {
    searchActions.setVertical("locations");
    searchActions.executeVerticalQuery().then((res) => {
      setResults(res.verticalResults.results),
        setLoading(false),
        setInitItem(res.verticalResults.results[0]);
      console.log(JSON.stringify(res.verticalResults));
    });
  }, []);

  return (
    <>
      {!loading && results.length >= 1 && initItem && (
        <>
          <View style={styles.container}>
            <MapView
              ref={mapViewRef}
              style={styles.map}
              initialRegion={{
                latitude: initItem.rawData.geocodedCoordinate.latitude,
                longitude: initItem.rawData.geocodedCoordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {results.map((data, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: data.rawData.geocodedCoordinate.latitude,
                      longitude: data.rawData.geocodedCoordinate.longitude,
                    }}
                    pinColor="#ab7a5f"
                  >
                    <Callout>
                      <Text>{data.rawData.name}</Text>
                    </Callout>
                  </Marker>
                );
              })}
            </MapView>
          </View>
          <ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            style={styles.chipsScrollView}
          >
            {results.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chipsItem}
                onPress={() =>
                  mapViewRef.current.animateToRegion(
                    {
                      latitude: category.rawData.geocodedCoordinate.latitude,
                      longitude: category.rawData.geocodedCoordinate.longitude,
                    },
                    1000
                  )
                }
              >
                <Text>{`${category.name}\n`}</Text>
                <Text>{`${category.rawData.address.line1}\n`}</Text>
                {category.rawData.address.line2 && (
                  <Text>{`${category.rawData.address.line2}\n`}</Text>
                )}
                <Text>
                  {`${category.rawData.address.city},
                  ${category.rawData.address.region}
                  ${category.rawData.address.postalCode}\n`}
                </Text>
                <Text>{category.rawData.address.countryCode}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
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
  chipsScrollView: {
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 125,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    width: 200,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
