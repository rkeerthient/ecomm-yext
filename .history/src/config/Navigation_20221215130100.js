import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import ProductsScreen from "../Screens/ProductsScreen";
import FAQsScreen from "../Screens/FAQsScreen";
import LocationsScreen from "../Screens/LocationsScreen";

import * as React from "react";
import ProductDetailScreen from "../Screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Products") {
              iconName = "shopping-bag";
            } else if (route.name === "FAQs") {
              iconName = "book";
            } else if (route.name === "Locations") {
              iconName = "map";
            }
            return <FontAwesome5 name={iconName} size={24} color="black" />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={() => ({
            tabBarStyle: {
              display: "none",
            },
            tabBarButton: () => null,
          })}
        />

        <Tab.Screen name="FAQs" component={FAQsScreen} />
        <Tab.Screen name="Locations" component={LocationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
