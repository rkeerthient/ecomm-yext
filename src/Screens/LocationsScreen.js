import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  setResetState_disp,
  setVerticalKey_disp,
} from "../features/SearchbarSlice";

const LocationsScreen = ({ route }) => {
  const { params } = route;
  const { isLoading_disp, results_disp } = useSelector(
    (state) => state.searchReducer
  );
  const mapViewRef = useRef();
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const SPACING_FOR_CARD_INSET = Dimensions.get("window").width * 0.1 - 10;
  useEffect(() => {
    if (focus) {
      dispatch(setResetState_disp());
      dispatch(setVerticalKey_disp(params.verticalKey));
    }
  }, [focus]);
  return (
    <>
      {!isLoading_disp &&
      results_disp.length >= 1 &&
      results_disp[0].rawData.geocodedCoordinate?.latitude ? (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: results_disp[0].rawData.geocodedCoordinate?.latitude,
              longitude: results_disp[0].rawData.geocodedCoordinate?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {results_disp.map((data, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: data.rawData.geocodedCoordinate?.latitude,
                    longitude: data.rawData.geocodedCoordinate?.longitude,
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
            {results_disp?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() =>
                  mapViewRef?.current?.animateToRegion(
                    {
                      latitude: category.rawData.geocodedCoordinate?.latitude,
                      longitude: category.rawData.geocodedCoordinate?.longitude,
                    },
                    1000
                  )
                }
              >
                <Text
                  style={{ fontWeight: "bold" }}
                >{`${category?.name}\n`}</Text>
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
      ) : (
        <Loading />
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
