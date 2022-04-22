import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import PostsContext from "../store/posts-store";

function PredictionDetailsPage({ navigation }) {
  //TODO SORT nach importance, duedate, category
  //TODO make overview counts felixble

  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const postsCtx = useContext(PostsContext);

  //on click defect item open detail page and pass defect data

  //Header of Defects list --> show total amount of defects and also High, Low, Medium --> inserted by flatlist on render
  const DefectsPageHeader = () => (
    <View>
      <View style={[tw``, { flex: 1 }]}>
        <Text style={tw`text-xl font-bold mb-0 mr-2 ml-2`}>Overview</Text>
        <Text style={tw`text-xl font-bold mb-0 mr-2 ml-2`}>Defects</Text>
      </View>
    </View>
  );

  return (
    <View style={[tw``, { flex: 1 }]}>
      <Text>
        Hier ist dann die Seite, auf der man weitere Details anzeigen könnte
      </Text>
    </View>
  );
}
export default PredictionDetailsPage;
