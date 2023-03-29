import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/HomeScreen";
import ProductDetailScreen from "../Screens/ProductDetailScreen";
import ProductsScreen from "../Screens/ProductsScreen";

const Stack = createNativeStackNavigator(); // creates object for Stack Navigator

const HomeScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetailScreenStack"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
};

const ProductsSreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductsStack" component={ProductsScreen} />
      <Stack.Screen
        name="ProductDetailScreenStack"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
};

export { HomeScreenNavigator, ProductsSreenNavigator }; // Stack-Navigator for Screen 2 Tab
