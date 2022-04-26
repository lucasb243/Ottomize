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
  username: yup.string().required("Username is required"),
  /* .email("You must enter a valid e-mail"), */
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
            initialValues={{ username: "", password: "" }}
            validationSchema={LogInSchema}
            onSubmit={(values) => {
              //TODO Function getUserData from Server
              const user = { username: values.username, pw: values.password };
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
                  label="Username"
                  icon="lock"
                  placeholder="john_doe_123"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <Text style={styles.errors}>{errors.username}</Text>
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
