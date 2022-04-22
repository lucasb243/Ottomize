import React, { useContext } from "react";

//React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loading from "../ui/Loading";
//screens
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import BottomNavigation from "./BottomNavigation";
import { View, Text } from "react-native";
import AuthContext from "../store/auth-context";
import UserContext from "../store/user-context";

const Stack = createNativeStackNavigator();

function RootStack() {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        /* headerTintColor: tertiary, */
        headerTransparent: true,
        headerTitle: "",
        headerLeftContainerStyler: {
          paddingLeft: 20,
        },
      }}
      initialRouteName="Login"
    >
      {authCtx.authState.isLoading ? (
        // We haven't finished checking for the token yet
        <Stack.Screen name="Splash" component={Loading} />
      ) : authCtx.authState.userToken === null ? (
        <>
          <Stack.Screen name="Login" component={LogInPage} />
          <Stack.Screen name="Signup" component={RegisterPage} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
            name="BottomNav"
            component={BottomNavigation}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
