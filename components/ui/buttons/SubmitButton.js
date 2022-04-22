import React from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";

function SubmitButton(props) {
  let aWidth = props.width ? props.width : "100%";
  let aHeight = props.height ? props.height : "100%";
  let aBorderRadius = props.height ? props.height / 2 : 0;
  let aColor = props.color ? props.color : "#fff";
  let aBackgroundColor = props.bgColor ? props.bgColor : "#FFD41B"; //"#007bff" normal submit color (apple)
  let aText = props.text ? props.text : "Submit";
  let aFontSize = props.fSize ? props.fSize : 18;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPress}
        style={styles.touchableOpacityStyle}
      >
        <View
          style={{
            marginVertical: 4,
            width: aWidth,
            maxWidth: 600,
            height: aHeight,
            borderRadius: aBorderRadius,
            backgroundColor: aBackgroundColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Text style={{ color: aColor, fontSize: aFontSize }}>{aText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SubmitButton;
