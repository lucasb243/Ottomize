import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

//formik
import { Formik } from "formik";

//icons
import { Octicons, Ionicons } from "@expo/vector-icons";

import { StyleSheet, Text } from "react-native";

import {
  StyledContainer,
  InnerContainer,
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
import { View, TouchableOpacity } from "react-native";

//colors
const { brand, darkLight } = Colors;

//Keyboard avoiding view
import KeyboardAvoidingWrapper from "../ui/KeyboardAvoidingWrapper";

//DateTimePicker
import DateTimePicker from "@react-native-community/datetimepicker";
import UserContext from "../store/user-context";
import AuthContext from "../store/auth-context";

import * as yup from "yup";

const RegisterSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email Address is required")
    .email("You must enter a valid e-mail"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Password Confirmation is required"),
});

const RegisterPage = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);

  // Actual date of birth to be sent
  const [dob, setDob] = useState();

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  function handleRegister(user) {
    authCtx.signUp(user);
  }

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer style={styles.register}>
          <PageTitle>BRCKFLW</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
              const user = {
                email: values.email,
                pw: values.password,
                username: values.username,
              };
              console.log("pass check");
              if (values.password === values.confirmPassword) {
                handleRegister(user);
              }
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
                  icon="person"
                  placeholder="John_Doe_123"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.errors}>{errors.fullName}</Text>
                )}
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
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errors}>{errors.confirmPassword}</Text>
                )}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Signup</ButtonText>
                </StyledButton>
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
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

const styles = StyleSheet.create({
  errors: { color: "red", marginBottom: 5, fontWeight: "bold" },
  register: { marginTop: 100 },
});

export default RegisterPage;
