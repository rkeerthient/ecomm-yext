import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import { useRef, useState, useEffect, useFocusEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useProductsContext } from "../context/ProductsContext";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { useIsFocused } from "@react-navigation/native";
import VertTabs from "../components/VertTabs";

const LocationsScreen = () => {
  const [results, setResults] = useState([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);
  const mapViewRef = useRef(null);
  const [initItem, setInitItem] = useState();
  const focus = useIsFocused(); // useIsFocused as shown
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  const { productResults, setProductResults, facets, setFacets } =
    useProductsContext();
  useEffect(() => {
    if (focus) {
      setFacets([]);
      searchActions.setVertical("locations");
      searchActions.executeVerticalQuery().then((res) => {
        setResults(res.verticalResults.results),
          setLoading(false),
          setInitItem(res.verticalResults.results[0]);
      });
    }
  }, [focus]);

  const facet = useSearchState((state) => state.filters.facets);

  useEffect(() => {
    facet &&
      !facets &&
      facet.map((item) => setFacets((facet) => [...facet, item.displayName]));
  }, [facet]);

  // useEffect(() => {
  //   console.log(JSON.stringify(facets));
  // }, [facets]);
  return (
    <>
      {!loading && results.length >= 1 && initItem && (
        // <View style={styles.container}>
        //   {facets && <VertTabs facets={facets} />}
        //   <View style={styles.mapContainer}>
        //     <MapView
        //       ref={mapViewRef}
        //       style={styles.map}
        //       initialRegion={{
        //         latitude: initItem.rawData.geocodedCoordinate.latitude,
        //         longitude: initItem.rawData.geocodedCoordinate.longitude,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421,
        //       }}
        //     >
        //       {results.map((data, index) => {
        //         return (
        //           <Marker
        //             key={index}
        //             coordinate={{
        //               latitude: data.rawData.geocodedCoordinate.latitude,
        //               longitude: data.rawData.geocodedCoordinate.longitude,
        //             }}
        //             pinColor="#ab7a5f"
        //           >
        //             <Callout>
        //               <Text>{data.rawData.name}</Text>
        //             </Callout>
        //           </Marker>
        //         );
        //       })}
        //     </MapView>
        //   </View>

        //   <View style={styles.detailsContainer}>
        //     <ScrollView
        //       horizontal
        //       scrollEventThrottle={1}
        //       showsHorizontalScrollIndicator={false}
        //       style={styles.chipsScrollView}
        //     >
        //       {results.map((category, index) => (
        //         <TouchableOpacity
        //           key={index}
        //           style={styles.chipsItem}
        //           onPress={() =>
        //             mapViewRef.current.animateToRegion(
        //               {
        //                 latitude: category.rawData.geocodedCoordinate.latitude,
        //                 longitude:
        //                   category.rawData.geocodedCoordinate.longitude,
        //               },
        //               1000
        //             )
        //           }
        //         >
        //           <Text>{`${category.name}\n`}</Text>
        //           <Text>{`${category.rawData.address.line1}\n`}</Text>
        //           {category.rawData.address.line2 && (
        //             <Text>{`${category.rawData.address.line2}\n`}</Text>
        //           )}
        //           <Text>
        //             {`${category.rawData.address.city}, ${category.rawData.address.region} ${category.rawData.address.postalCode}\n`}
        //           </Text>
        //           <Text>{category.rawData.address.countryCode}</Text>
        //         </TouchableOpacity>
        //       ))}
        //     </ScrollView>
        //   </View>
        // </View>
        <View style={{ flex: 1 }}>
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

          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={true}
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
          >
            {results.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
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
                <Text
                  style={{ fontWeight: "bold" }}
                >{`${category.name}\n`}</Text>
                <Text>{`${category.rawData.address.line1}\n`}</Text>
                {category.rawData.address.line2 && (
                  <Text>{`${category.rawData.address.line2}\n`}</Text>
                )}
                <Text>
                  {`${category.rawData.address.city}, ${category.rawData.address.region} ${category.rawData.address.postalCode}\n`}
                </Text>
                <Text>{category.rawData.address.countryCode}</Text>
                <View style={styles.ctaWrapper}>
                  <TouchableOpacity style={styles.cta}>
                    <Text style={styles.ctaText}>Call us</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cta}>
                    <Text style={styles.ctaText}>Get Directions</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>
      )}
    </>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 185,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    width: width - 20,
  },
  ctaWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  cta: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ab7a5f",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  ctaText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});
