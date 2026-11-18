import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import WeatherScreen from "../screens/WeatherScreen";
import PackingScreen from "../screens/PackingScreen";
import MyTripsScreen from "../screens/MyTripsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#285943",
        },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: "#285943",
        tabBarInactiveTintColor: "#888888",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Packing" component={PackingScreen} />
      <Tab.Screen name="My Trips" component={MyTripsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            title: "Weather Details",
            headerStyle: { backgroundColor: "#285943" },
            headerTintColor: "#FFFFFF",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}