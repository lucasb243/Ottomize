import React, { useContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PredictionDetailsPage from "../pages/PredictionDetailsPage";
import AccountPage from "../pages/AccountPage";
import HomePage from "../pages/HomePage";
import UserContext from "../store/user-context";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

/* FOR ICONS WATCH HERE: https://oblador.github.io/react-native-vector-icons/ */

function BottomNavigation({ navigation }) {
  const userCtx = useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => (
          <View style={{ alignContent: "center", justifyContent: "center" }}>
            <Text style={styles.heading}>Ottomize</Text>
          </View>
        ),
        tabBarActiveTintColor: "#fbd017",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          /* headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("ChatHome")}>
              <FontAwesome5
                name="paper-plane"
                size={24}
                color="#fbd017"
                style={styles.FontAwesomeChatIcon}
              />
            </TouchableOpacity>
          ), */
          name: "Home",
          headerTitle: "Home",
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Defects"
        component={PredictionDetailsPage}
        options={{
          headerTitle: "Defects",
          headerTitleAlign: "center",
          tabBarLabel: "Defects",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="hammer-wrench"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          headerTitle: "Account",
          headerTitleAlign: "center",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    justifyContent: "center",
    fontSize: 35,
    fontWeight: "900",
    marginLeft: 15,
    color: "#FFD41B",
  },
  FontAwesomeChatIcon: {
    marginRight: 15,
  },
});
