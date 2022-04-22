import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootStack from "../navigators/RootStack";

function InitialStartPage() {
  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}

export default InitialStartPage;
