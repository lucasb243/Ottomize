import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import tw from "twrnc";
import SubmitButton from "../ui/buttons/SubmitButton";
import CancleButton from "../ui/buttons/CancleButton";

function ValidateEditModal(props) {
  function handleCancle() {
    props.handleCancleModal();
  }
  function handleSubmit() {
    props.onSubmit();
    handleCancle();
  }
  return (
    <Modal
      isVisible={props.visible}
      hasBackdrop={true}
      onBackdropPress={handleCancle}
    >
      <SafeAreaView style={styles.container}>
        <View>
          {props.field === "Project key" ? (
            <>
              <Text style={tw`font-bold text-2xl mb-4`}>
                Are you sure you what to add a new {props.field} ?
              </Text>
              <Text style={tw`font-bold text-2xl mb-4`}>
                You entred: {props.value}
              </Text>
            </>
          ) : null}
          {props.field === "E-Mail" ? (
            <>
              <Text style={tw`font-bold text-2xl mb-4`}>
                Are you sure you what to change your E-Mail?
              </Text>
              <Text style={tw`font-bold text-2xl mb-4`}>
                You entred: {props.value}
              </Text>
            </>
          ) : null}
          {props.field === "Password" ? (
            <>
              <Text style={tw`font-bold text-2xl mb-4`}>
                Are you sure you what to change your password?
              </Text>
              <Text style={tw`font-bold text-2xl mb-4`}>
                You cannot undo this!
              </Text>
            </>
          ) : null}
          <SubmitButton
            onPress={handleSubmit}
            title="Submit"
            height={50}
            width={200}
          />
          <CancleButton
            onPress={handleCancle}
            title="Cancle"
            height={50}
            width={200}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ValidateEditModal;
