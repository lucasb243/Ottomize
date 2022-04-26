import React from "react";
import { View } from "react-native";
import tw from "twrnc";

function Card(props) {
  return (
    <View style={[tw`p-2 shadow rounded-lg bg-white`, { flex: 0 }]}>
      {props.children}
    </View>
  );
}
export default Card;
