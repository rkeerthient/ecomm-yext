import * as React from "react";
import { useState } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

export default function AccTest() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <div className="App">
      <h1>Sample</h1>
      <Tabs>
        <TabList>
          <Tab>
            <p>Title 1</p>
          </Tab>
          <Tab>
            <p>Title 2</p>
          </Tab>
          <Tab>
            <p>Title 3</p>
          </Tab>
          <Tab>
            <p>Title 4</p>
          </Tab>
          <Tab>
            <p>Title 5</p>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <h2>Any content 1</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 2</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 3</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 4</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <h2>Any content 5</h2>
          </div>
        </TabPanel>
      </Tabs>
    </div>
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
