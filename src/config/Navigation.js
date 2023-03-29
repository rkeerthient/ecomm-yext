import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import ProductsScreen from "../Screens/ProductsScreen";
import FAQsScreen from "../Screens/FAQsScreen";
import LocationsScreen from "../Screens/LocationsScreen";

import * as React from "react";
import ProductDetailScreen from "../Screens/ProductDetailScreen";
import { FirstScreenNavigator, SecondScreenNavigator } from "./StackScreens";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();
const Navigation = () => {
  const { isLoading_disp } = useSelector((state) => state.searchReducer);

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
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          screenOptions={{ headerShrown: false }}
        />

        <Tab.Screen
          name="Products"
          component={ProductsScreen}
          initialParams={{ verticalKey: "products" }}
        />

        <Tab.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />

        <Tab.Screen
          name="FAQs"
          component={FAQsScreen}
          initialParams={{ verticalKey: "faqs" }}
        />
        <Tab.Screen
          name="Locations"
          component={LocationsScreen}
          options={{ headerShown: false }}
          initialParams={{ verticalKey: "locations" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
