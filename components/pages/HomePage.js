import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  Dimensions,
} from "react-native";
import PostsContext from "../store/posts-store";
import UserContext from "../store/user-context";
import tw from "twrnc";
import Card from "../ui/Card";
import BezierLineChart from "../ui/BezierLineChart";

function HomePage({ navigation }) {
  const postsCtx = useContext(PostsContext);
  const userCtx = useContext(UserContext);

  return (
    <View style={[tw`p-3`, { flex: 1 }]}>
      <Card>
        <BezierLineChart />
      </Card>
    </View>
  );
}

export default HomePage;
