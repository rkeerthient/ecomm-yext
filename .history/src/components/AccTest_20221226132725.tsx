import * as React from "react";
import { useState } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import {
  TabBarVertical,
  TabViewVertical,
  SceneMap,
  type Route,
  type NavigationState,
  SelectedTabBar,
} from "react-native-vertical-tab-view";
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export default function AccTest() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <SelectedTabBar
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDECED",
  },
  tabbar: {
    backgroundColor: "#205493",
  },
  tab: {
    width: 110,
    height: 80,
  },
  icon: {
    backgroundColor: "transparent",
    color: "#ffffff",
  },
  indicator: {
    width: 110,
    height: 80,
    backgroundColor: "#F6F7F8",
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Source Sans Pro",
    paddingTop: 5,
    color: "#F6F7F8",
    backgroundColor: "transparent",
  },
});
