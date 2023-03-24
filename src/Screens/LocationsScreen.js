import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  setVerticalKey_disp,
  setSearchTerm_disp,
  setisLoading_disp,
  setResults_disp,
} from "../features/SearchbarSlice";
import { useIsFocused } from "@react-navigation/native";
import VertTabs from "../components/VertTabs";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

const LocationsScreen = () => {
  const mapViewRef = useRef(null);
  const [initItem, setInitItem] = useState();
  const focus = useIsFocused(); // useIsFocused as shown
  const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;

  const dispatch = useDispatch();
  const { isLoading_disp, results } = useSelector(
    (state) => state.searchReducer
  );
  // const facet = useSearchState((state) => state.filters.facets);

  useEffect(() => {
    // setFacets([]);
    if (focus) {
      dispatch(setResults_disp([]));
      dispatch(setVerticalKey_disp("locations"));
      dispatch(setSearchTerm_disp(""));
    }
  }, [focus]);

  // useEffect(() => {
  //   if (results) {
  //     dispatch(setisLoading_disp(true));
  //     results.length >= 1 && setInitItem(results[0]);
  //     dispatch(setisLoading_disp(false));
  //   }
  // }, [results]);

  // useEffect(() => {
  //   facet &&
  //     !facets &&
  //     facet.map((item) => setFacets((facet) => [...facet, item.displayName]));
  // }, [facet]);

  // useEffect(() => {
  //   console.log(JSON.stringify(facets));
  // }, [facets]);
  return (
    <>
      {isLoading_disp && results.length <= 0 ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: results[0].rawData.geocodedCoordinate.latitude,
              longitude: results[0].rawData.geocodedCoordinate.longitude,
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
    width: Dimensions.get("window").width - 20,
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
