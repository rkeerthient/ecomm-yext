import * as React from "react";
import { useState } from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function AccTest() {
  return (
    <div className="App">
      <Text>Sample</Text>
      <Tabs>
        <TabList>
          <Tab>
            <Text>Title 1</Text>
          </Tab>
          <Tab>
            <Text>Title 2</Text>
          </Tab>
          <Tab>
            <Text>Title 3</Text>
          </Tab>
          <Tab>
            <Text>Title 4</Text>
          </Tab>
          <Tab>
            <Text>Title 5</Text>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="panel-content">
            <Text>Any content 1</Text>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <Text>Any content 2</Text>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <Text>Any content 3</Text>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <Text>Any content 4</Text>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="panel-content">
            <Text>Any content 5</Text>
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
