import React, { useContext, useState, useRef } from "react";
import { Text, Image, View, StyleSheet, ViewPropTypes } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../store/user-context";
import {
  StyledFormAreaLogOut,
  StyledFormArea,
  StyledButtonLogOut,
  StyledButtonEditProfile,
  ButtonText,
  LeftIcon,
  RightIconLogOut,
  RightIcon,
  Colors,
  StyledAccountPageLabel,
  StyledTextInput,
} from "../styles";

import KeyboardAvoidingWrapper from "../ui/KeyboardAvoidingWrapper";
import Icon from "@expo/vector-icons/FontAwesome";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { onChange } from "react-native-reanimated";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthContext from "../store/auth-context";

import * as yup from "yup";

DropDownPicker.setListMode("SCROLLVIEW");

const AccountSchema = yup.object({
  prjKey: yup.string(),
  email: yup.string().email("You must enter a valid e-mail"),
  password: yup.string(),
  passwordConfirm: yup.string(),
});

//colors
const { brand, darkLight } = Colors;

const MyTextInput = ({
  label,
  icon,
  isProjectActive = "false",
  isEmailActive = "false",
  isPasswordActive = "false",
  /*   isPasswordActive,
  isEmailActive,
  isProjectActive, */
  ...props
}) => {
  return (
    <View style={{ width: "65%", minWidth: "65%", marginTop: 10 }}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledAccountPageLabel>{label}</StyledAccountPageLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

function AccountPage({ navigation }) {
  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);
  const [modalOpenPrjKey, setModalOpenPrjKey] = useState(false);
  const [modalOpenMail, setModalOpenMail] = useState(false);
  const [modalOpenPW, setModalOpenPW] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [images, setImages] = useState([]);
  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };
  const pickerValues = userCtx.access_registers.map((accessregister) => {
    return {
      label: accessregister.project.name,
      value: accessregister.project.id,
    };
  });
  function handleLogOut() {
    userCtx.setCurrentProject(null);
    authCtx.signOut();
  }
  function handleCancleModal() {
    setModalOpen(false);
  }
  function onSubmitEdit(field, value) {
    // do smth
    setModalOpen(false);
  }
  function handleChangeUserIcon() {
    onOpen();
  }
  function handleGetPicture(images) {
    console.log(images);
    userCtx.changeIcon(images[0].uri);
    userCtx.postUserIconToServer(images[0], images[0].image.uri);
  }
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <KeyboardAvoidingWrapper>
        <SafeAreaView
          style={{
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={handleChangeUserIcon}>
            <Image
              style={{
                height: 150,
                width: 150,
                resizeMode: "cover",
              }}
              borderRadius={150 / 2}
              source={{ uri: userCtx.icon }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {userCtx.fullName}
          </Text>
          <DropDownPicker
            onChangeValue={(item) => {
              console.log(item);
              userCtx.setCurrentProject(item);
            }}
            open={open}
            value={value}
            items={pickerValues}
            /* defaultValue={userCtx.currentProject} */
            setOpen={setOpen}
            setValue={setValue}
            placeholder="Select Project"
            dropDownContainerStyle={{ width: "40%", alignSelf: "center" }}
            placeholderStyle={{
              color: "#000",
              fontWeight: "500",
              fontSize: 17,
            }}
            style={styles.DropDownPicker}
          />
          <StyledFormArea style={{ alignItems: "center", width: "100%" }}>
            <Formik
              style={{ width: "100%" }}
              initialValues={{ prjKey: "" }}
              validationSchema={AccountSchema}
              onSubmit={(values) => userCtx.addProject(values.prjKey)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <MyTextInput
                    label="Add Project"
                    icon="home"
                    placeholder={"Enter project code"}
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("prjKey")}
                    onEndEditing={() => {
                      values.prjKey !== "" ? setModalOpenPrjKey(true) : null;
                    }}
                    onBlur={handleBlur("prjKey")}
                    value={values.prjKey}
                  />
                  {errors.prjKey && touched.prjKey && (
                    <Text style={styles.errors}>{errors.prjKey}</Text>
                  )}

                  <ValidateEditModal
                    visible={modalOpenPrjKey}
                    value={values.prjKey}
                    field="Project key"
                    handleCancleModal={() => {
                      setModalOpenPrjKey(false);
                    }}
                    onSubmit={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            <Formik
              style={{ width: "100%" }}
              initialValues={{ email: "" }}
              validationSchema={AccountSchema}
              onSubmit={(values) => userCtx.changeEmail(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <MyTextInput
                    label="Change Email Address"
                    icon="mail"
                    placeholder={userCtx.email}
                    placeholderTextColor={darkLight}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    onEndEditing={() => {
                      values.email !== "" ? setModalOpenMail(true) : null;
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errors}>{errors.email}</Text>
                  )}
                  <ValidateEditModal
                    visible={modalOpenMail}
                    value={values.email}
                    field="E-Mail"
                    handleCancleModal={() => {
                      setModalOpenMail(false);
                    }}
                    onSubmit={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            <Formik
              style={{ width: "100%" }}
              initialValues={{ password: "" }}
              validationSchema={AccountSchema}
              onSubmit={(values) => {
                values.password === values.passwordConfirm
                  ? userCtx.changePassword(values.password)
                  : null;
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
                <View>
                  <MyTextInput
                    label="Set New Password"
                    icon="lock"
                    placeholder="* * * * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    onEndEditing={() => {
                      values.password !== "" &&
                      values.passwordConfirm == values.password
                        ? setModalOpenPW(true)
                        : null;
                    }}
                  />
                  <MyTextInput
                    label="Confirm New Password"
                    icon="lock"
                    placeholder="* * * * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("passwordConfirm")}
                    onBlur={handleBlur("passwordConfirm")}
                    value={values.passwordConfirm}
                    onEndEditing={() => {
                      values.passwordConfirm !== "" &&
                      values.passwordConfirm == values.password
                        ? setModalOpenPW(true)
                        : null;
                    }}
                  />
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <Text style={styles.errors}>{errors.passwordConfirm}</Text>
                  )}
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                  {/*HIER EIG AUCH NOCH PASSWORD CONFIRM EINBAUEN IN IENEM FORM --> MACHT MEHR SINN WEIL ES ZSM GEHÖRT */}
                  <ValidateEditModal
                    visible={modalOpenPW}
                    field="Password"
                    handleCancleModal={() => {
                      setModalOpenPW(false);
                    }}
                    onSubmit={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            <BottomSheet
              getPicture={handleGetPicture}
              modalRef={modalRef}
              onClose={onClose}
              navigation={navigation}
            />
          </StyledFormArea>
          <StyledFormAreaLogOut>
            <StyledButtonLogOut onPress={handleLogOut}>
              <ButtonText>Log out</ButtonText>
            </StyledButtonLogOut>
          </StyledFormAreaLogOut>
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
    </View>
  );
}

export default AccountPage;

const styles = StyleSheet.create({
  DropDownPicker: {
    height: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    fontWeight: "bold",
    alignSelf: "center",
    width: "40%",
    marginBottom: 15,
    marginTop: 5,
    /* position: "relative", */
  },
  errors: { color: "red", marginBottom: 5, fontWeight: "bold" },
});
