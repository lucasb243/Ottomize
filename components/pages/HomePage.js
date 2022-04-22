import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Button } from "react-native";
import PostsContext from "../store/posts-store";
import UserContext from "../store/user-context";

function HomePage({ navigation }) {
  const postsCtx = useContext(PostsContext);
  const userCtx = useContext(UserContext);

  return <View style={{ flex: 1 }}></View>;
}

const styles = StyleSheet.create({});
export default HomePage;
