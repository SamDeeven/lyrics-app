import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, FlatList, StyleSheet, Linking } from "react-native";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

function HorizontalCards() {
  const [isTelugu, setIsTelugu] = useState(false);
  const [fontsLoad] = useFonts({
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }
  const data = [
    {
      id: uuid.v4(),
      title: "Subscribe to listen and learn Music",
      teluguTitle: "పాటలు వినడానికి & కీబోర్డ్ నేర్చుకోవడానికి...",
      text: "You will find worship songs and keyboard tutorials",
      teluguText:
        "ఈ యూట్యూబ్ చానల్ లో ఆరాధన పాటలు & కీబోర్డ్ ఎలా నేర్చుకోవాలో అనే విషయాలు ఉంటాయి",
      image: "",
      link: "https://www.youtube.com/@SamDeeven",
      buttonName: "Subscribe",
      icon: "logo-youtube",
    },
    {
      id: uuid.v4(),
      title: "Subscribe to our Church Channel",
      teluguTitle: "మన సంఘ ఆరధన...",
      text: "You will find our Church Service Live videos",
      teluguText:
        "మన సంఘ ఆరాధన చూడడానికి ఈ యూట్యూబ్ చానల్ ని subscribe చెయ్యండి",
      image: "",
      link: "https://www.youtube.com/@HSBCKAKINADA/streams",
      buttonName: "Subscribe",
    },
    {
      id: uuid.v4(),
      title: "About this App",
      teluguTitle: "ఈ యాప్ గురించి",
      text: "Hello, I am Sam Deeven (Vinnu). I hope this app helps you in your church service for Song Lyrics without internet.",
      teluguText:
        "చర్చ్ లో పాటల సమయములో ఇంటెర్నెట్  లేకుండా అందరూ క్వయర్ తో కలిసి పాడటానికి వీలు గా ఉండడానికి ఈ ఆప్ ఉపయోగపడుతుంది.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Search your favorite song lyrics",
      teluguTitle: "మీకు ఇష్టమైన పాటను వెతకండి",
      text: "Use the search feature on the the top of the Home Screen, and get song suggestions based on your searched words.",
      teluguText:
        "నచ్చిన పాటని వెతకడం కోసం పైన సెర్చ్(search) మీద నొక్కి పాటని టైప్ చేసి చూడండి. లేదా, మీరు టైప్ చెస్తున్నప్పుడు ఆ పదాలతో ఉన్న పాటల జాబితా(list) లో కూడా మీరు వెతకచ్చు.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "5 Random Songs Feature",
      teluguTitle: "ఏదైన 5 పాటలు",
      text: "When you press the '5 Random Songs' button, a list of 5 random songs will be generated, saving your time in searching for a song. If the generated list is not suitable for you at that moment, you can refresh the page by pulling the screen down to get new list.",
      teluguText:
        "'5 Random Songs' బటన్ నొక్కితే, ఏదైన 5 పాటల జాబితా వస్తాది. దీనివల్ల మీ సమయం పాట వెకడం లొ వృదా అవ్వదు. ఒకవేళ మీకు ఆ జాబితా మీకు తగినది కాకపోతె, ఆ స్క్రీన్(screen) ని కిందకి లాగండి, అప్పుడు వేరే 5 పాటలు జాబితా వస్తుంది.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Adjust the font size for Lyrics",
      teluguTitle: "పాట అక్షరాల పరిమాణం/కొలత మార్చుకోవచు",
      text: "Adjust the font size/letter size for Lyrics screen according to your convinience with the available 3 options.",
      teluguText:
        "ఇవ్వబడిన 3 ఎంపికలలో పాట లో ఉన్న అక్షరాల పరిమాణం ని మీ అనుకూలతను బట్టి సర్దుకొండి.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Video Song Option",
      teluguTitle: "వీడియో సాంగ్",
      text: "On the top of Lyrics screen, there will be a 'Video Song' button. When you press it, it will play the YouTube video of that song",
      teluguText:
        "పాట చూస్తున్నప్పుడు పైన భాగం లో 'Video Song' అని ఒక బటన్ ఉంటుంది. అది నొక్కితే YouTube లో ఆ పాట వస్తాది.",
      image: "",
      link: "",
      buttonName: "",
    },
  ];

  const handleLanguage = () => {
    setIsTelugu(!isTelugu);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#0a3431", "#407A52", "#4a9b7f", "#1c3e35"]}
        style={styles.gradient}
      >
        <Text
          style={{
            color: "#E5D68A",
            fontSize: 18,
            textAlign: "auto",
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          {isTelugu ? item.teluguTitle : item.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 0,
            marginBottom: 6,
            textAlign: "justify",
            fontFamily: "Poppins_400Regular",
            color:"#ECF0F1"
          }}
        >
          {isTelugu ? item.teluguText : item.text}
        </Text>

        {item.buttonName && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              style={{ width: 130, alignItems:"center" }}
            >
              <Text
                style={{
                  marginHorizontal:10,
                  padding: 6,
                  backgroundColor: "red",
                  textAlign: "center",
                  color: "white",
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {item.buttonName}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => handleLanguage()}
          style={{
            position: "absolute",
            bottom: 8,
            padding: 3,
            backgroundColor: "lightblue",
            width: 130,
            borderRadius: 5,
           right:4,
          }}
        >
          <Text style={{textAlign:"center", fontSize: 15, fontFamily: "" }}>
            {isTelugu ? "Read in English" : "తెలుగు లో చదవండి"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  card: {
    width: 365,
    height: 190,
    // backgroundColor: "#242B2E",
    marginHorizontal: 5,
    // borderRadius: 10,
    // borderColor: "#392e4a",
    // borderWidth: 1,
  },
  gradient: {
    flex: 1,
    borderRadius:10,
    padding:6
  },
});

export default HorizontalCards;
