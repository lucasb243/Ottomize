import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text } from "react-native";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons } from "@expo/vector-icons";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledButton,
  StyledTextInput,
  RightIcon,
  Colors,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../styles";
import { View } from "react-native";

import * as yup from "yup";

const LogInSchema = yup.object({
  email: yup
    .string()
    .required("Email Address is required")
    .email("You must enter a valid e-mail"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

//colors
const { brand, darkLight, primary } = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from "../ui/KeyboardAvoidingWrapper";

import UserContext from "../store/user-context";
import { BackHandler } from "react-native-web";
import AuthContext from "../store/auth-context";

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};
const DUMMY_USER = {
  name: "Anonymous",
  icon: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Alberto_conversi_profile_pic.jpg",
  email: "lucas.brach@sap.com",
  userId: 1,
  projects: [],
  isBuilder: false,
  addresses: [
    {
      id: 1,
      street: "Seckenheimer Landstaße 4a",
      city: "Mannheim",
      postcode: 68163,
      type: "Home",
    },
    {
      id: 2,
      street: "Hauptstraße 14",
      city: "Minfeld",
      postcode: 76872,
      type: "Home",
    },
  ],
};

function LogInPage({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);

  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);

  function handleLogIn(user) {
    //give date to auth service;
    authCtx.signIn(user);
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../../assets/Ottomize_Logo.png")}
          />
          <PageTitle>OTTOMIZE</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LogInSchema}
            onSubmit={(values) => {
              //TODO Function getUserData from Server
              const user = { email: values.email, pw: values.password };
              handleLogIn(user);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="john@doe.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errors}>{errors.email}</Text>
                )}
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errors}>{errors.password}</Text>
                )}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent>Register here</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  errors: { color: "red", marginBottom: 5, fontWeight: "bold" },
});

export default LogInPage;
