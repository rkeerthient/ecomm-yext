import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
  // const [initItem, setInitItem] = useState({
  //   region: {
  //     latitude: LATITUDE,
  //     longitude: LONGITUDE,
  //     latitudeDelta: LATITUDE_DELTA,
  //     longitudeDelta: LONGITUDE_DELTA,
  //   },
  // });
  // useEffect(() => {
  //   searchActions.setVertical("locations");
  //   searchActions.executeVerticalQuery().then((res) => {
  //     setResults(res.verticalResults.results),
  //       setLoading(false),
  //       setInitItem(res.verticalResults.results[0]);
  //   });
  // }, []);

  // useEffect(() => {
  //   const nItem = {
  //     ...initItem,
  //     latitude: initItem.latitude,
  //     longitude: initItem.longitude,
  //   };
  //   setInitItem(nItem);
  //   console.log(JSON.stringify(initItem));
  // }, [initItem]);
  constructor = (props) => {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  jumpRandom = () => {
    this.setState({ region: this.randomRegion() });
  };

  animateRandom = () => {
    this.map.animateToRegion(this.randomRegion());
  };

  animateRandomCoordinate = () => {
    this.map.animateToCoordinate(this.randomCoordinate());
  };

  animateToRandomBearing = () => {
    this.map.animateToBearing(this.getRandomFloat(-360, 360));
  };

  animateToRandomViewingAngle = () => {
    this.map.animateToViewingAngle(this.getRandomFloat(0, 90));
  };

  getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  randomCoordinate = () => {
    const region = this.state.region;
    return {
      latitude:
        region.latitude + (Math.random() - 0.5) * (region.latitudeDelta / 2),
      longitude:
        region.longitude + (Math.random() - 0.5) * (region.longitudeDelta / 2),
    };
  };

  randomRegion = () => {
    return {
      ...this.state.region,
      ...this.randomCoordinate(),
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={this.props.provider}
        ref={(ref) => {
          this.map = ref;
        }}
        mapType={MAP_TYPES.TERRAIN}
        style={styles.map}
        initialRegion={this.state.region}
        onRegionChange={(region) => this.onRegionChange(region)}
      />
      <View style={[styles.bubble, styles.latlng]}>
        <Text style={{ textAlign: "center" }}>
          {this.state.region.latitude.toPrecision(7)},
          {this.state.region.longitude.toPrecision(7)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.jumpRandom()}
          style={[styles.bubble, styles.button]}
        >
          <Text style={styles.buttonText}>Jump</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.animateRandom()}
          style={[styles.bubble, styles.button]}
        >
          <Text style={styles.buttonText}>Animate (Region)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.animateRandomCoordinate()}
          style={[styles.bubble, styles.button]}
        >
          <Text style={styles.buttonText}>Animate (Coordinate)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.animateToRandomBearing()}
          style={[styles.bubble, styles.button]}
        >
          <Text style={styles.buttonText}>Animate (Bearing)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.animateToRandomViewingAngle()}
          style={[styles.bubble, styles.button]}
        >
          <Text style={styles.buttonText}>Animate (View Angle)</Text>
        </TouchableOpacity>
      </View>
    </View>
    // <>
    //   {!loading && results.length >= 1 && initItem && (
    //     <>
    //       <View style={styles.container}>
    //         <MapView
    //           style={styles.map}
    //           initialRegion={{
    //             latitude: initItem.rawData.geocodedCoordinate.latitude,
    //             longitude: initItem.rawData.geocodedCoordinate.longitude,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //           }}
    //         >
    //           <Marker
    //             coordinate={{
    //               latitude: initItem.rawData.geocodedCoordinate.latitude,
    //               longitude: initItem.rawData.geocodedCoordinate.longitude,
    //             }}
    //             pinColor="#ab7a5f"
    //           >
    //             <Callout>
    //               <Text>{initItem.rawData.name}</Text>
    //             </Callout>
    //           </Marker>
    //         </MapView>
    //       </View>
    //       <ScrollView
    //         horizontal
    //         scrollEventThrottle={1}
    //         showsHorizontalScrollIndicator={false}
    //         height={50}
    //         style={styles.chipsScrollView}
    //         contentInset={{
    //           top: 0,
    //           left: 0,
    //           bottom: 0,
    //           right: 20,
    //         }}
    //         contentContainerStyle={{
    //           paddingRight: Platform.OS === "android" ? 20 : 0,
    //         }}
    //       >
    //         {results.map((category, index) => (
    //           <TouchableOpacity
    //             key={index}
    //             style={styles.chipsItem}
    //             onPress={() => setInitItem(category)}
    //           >
    //             <Text>{category.name}</Text>
    //           </TouchableOpacity>
    //         ))}
    //       </ScrollView>
    //     </>
    //   )}
    // </>
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
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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
    // padding: 10,
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
    // marginTop: 5,
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
