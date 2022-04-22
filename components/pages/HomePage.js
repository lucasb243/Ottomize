import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Button, Text } from "react-native";
import PostsContext from "../store/posts-store";
import UserContext from "../store/user-context";

function HomePage({ navigation }) {
  const postsCtx = useContext(PostsContext);
  const userCtx = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <Text>
        Hier ist dann die Seite, auf der alles Wesentliche auf einen Blick
        angezeigt wird
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
export default HomePage;
