import React from "react";
import { View, Button, TouchableOpacity, Text, StyleSheet } from "react-native";

function CancleButton(props) {
  let aWidth = props.width ? props.width : "100%";
  let aHeight = props.height ? props.height : "100%";
  let aBorderRadius = props.height ? props.height / 2 : 0;
  let aColor = props.color ? props.color : "#aeaeb2";
  let aBackgroundColor = props.bgColor ? props.bgColor : "#fff";
  let aText = props.text ? props.text : "Cancle";
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
            borderColor: aColor,
            borderWidth: 1.5,
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
export default CancleButton;
