import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import InitialStartPage from "./components/pages/InitialStartPage";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "./components/store/auth-context";
import React from "react";

export default function App() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <InitialStartPage />
        </NavigationContainer>
      </SafeAreaProvider>
      <StatusBar style="dark" />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
