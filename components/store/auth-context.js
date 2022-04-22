import React, { createContext, useEffect, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const AuthContext = createContext({
  authState: null,
  axios: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

export function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            chatToken: action.chattoken,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            chatToken: action.chattoken,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            chatToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      chatToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let chatToken;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync("userToken");
        chatToken = await SecureStore.getItemAsync("chatToken");
        console.log("loaded successfully userT: " + userToken);
        console.log("loaded successfully chatT: " + chatToken);
      } catch (e) {
        // Restoring token failed
        console.log("Restoring token failed");
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        chattoken: chatToken,
      });
    };
    bootstrapAsync();
  }, []);

  const instance = axios.create({
    baseURL: "http://vserver.heinrichs.tech:8000/api/v1/",
    timeout: 1000,
    headers: { Authorization: `Bearer ${state.userToken}` },
  });
  instance.defaults.timeout = 5000;
  instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  /*  instance.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  }); */

  const authContext = React.useMemo(
    () => ({
      authState: state,
      axios: instance,
      signIn: async (udata) => {
        // udata => Object { uname: XXX, pw: XXX, ....}
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let userToken;
        let chatToken;
        var userMail = udata.email;
        var userPW = udata.pw;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(
            `grant_type=&username=${userMail}&password=${userPW}&scope=&client_id=&client_secret=`
          ),
        };
        const response = await fetch(
          "http://vserver.heinrichs.tech:8000/api/token",
          requestOptions
        );
        const data = await response.json();

        if (!response.ok) {
          console.log("haha:" + data.detail);
        } else {
          //safe to securestore
          userToken = data.access_token;
          chatToken = data.chat_token;
          await SecureStore.setItemAsync("userToken", userToken);
          await SecureStore.setItemAsync("chatToken", chatToken);
        }

        dispatch({ type: "SIGN_IN", token: userToken, chattoken: chatToken });
      },
      signOut: () => {
        SecureStore.deleteItemAsync("userToken");
        SecureStore.deleteItemAsync("chatToken");
        kitty.endSession();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (udata) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let userToken;
        let chatToken;
        var userMail = udata.email;
        var userPW = udata.pw;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: JSON.stringify(
            `grant_type=&username=${userMail}&password=${userPW}&scope=&client_id=&client_secret=`
          ),
        };
        const response = await fetch(
          "http://vserver.heinrichs.tech:8000/api/signup",
          requestOptions
        );
        const data = await response.json();

        if (!response.ok) {
          console.log(data.detail);
        } else {
          userToken = data.access_token;
          // safe to securestore
          await SecureStore.setItemAsync("userToken", userToken);
          await SecureStore.setItemAsync("chatToken", chatToken);
        }

        dispatch({ type: "SIGN_IN", token: userToken, chattoken: chatToken });
      },
    }),
    [state]
  );
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
