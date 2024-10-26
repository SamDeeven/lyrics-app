import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList, StyleSheet, Linking } from "react-native";
import uuid from "react-native-uuid";
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
// import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

function HorizontalCards() {
  const [isTelugu, setIsTelugu] = useState(false);
  // const [fontsLoad] = useFonts({
  //   Poppins_300Light,
  //   Poppins_300Light_Italic,
  //   Poppins_400Regular,
  //   Poppins_400Regular_Italic,
  //   Poppins_500Medium,
  //   Poppins_500Medium_Italic,
  //   Poppins_600SemiBold,
  //   Poppins_600SemiBold_Italic,
  //   Poppins_700Bold,
  // });

  // if (!fontsLoad) {
  //   return <AppLoading />;
  // }
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
      title: "6 Random Songs Feature",
      teluguTitle: "ఏదైన 6 పాటలు",
      text: "'6 Random Songs' button generates a list of 6 random songs, saving time searching. If it's not suitable, pull down to refresh for a new list.",
      teluguText:
        "'6 Random Songs' బటన్ నొక్కితే, ఏదైన 6 పాటల జాబితా వస్తాది. దీనివల్ల మీ సమయం పాటలు వెకడం లో వృదా అవ్వదు. ఒకవేళ మీకు ఆ జాబితా మీకు తగినది కాకపోతె, ఆ స్క్రీన్(screen) ని కిందకి లాగండి, అప్పుడు వేరే 6 పాటలు జాబితా వస్తుంది.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Menu Option on Home Screen",
      teluguTitle: "Menu Option on Home Screen",
      text: "On the top of Home Screen, there is a Menu option. When you press it, you will see the available options",
      teluguText:
        "Home స్క్రీన్ పైన, మెనూ ఎంపిక ఉంది. మీరు దాన్ని నొక్కినప్పుడు, మీకు అందుబాటులో ఉన్న ఎంపికలు కనిపిస్తాయి.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Font Size",
      teluguTitle: "అక్షరాల పరిమాణం",
      text: "The Lyrics Screen offers font size adjustment.",
      teluguText:
        "లిరిక్స్ స్క్రీన్‌లో, అక్షరాల పరిమాణాన్ని మీ అనుకూలత ప్రకారం అక్షరాల పరిమాణాన్ని మార్చుకోవచ్చు",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Video Song option on Lyrics Screen",
      teluguTitle: "Video Song option on Lyrics Screen",
      text: "Watch the song on YouTube for reference.",
      teluguText:
        "పాటను వినడానికి  YouTube బటన్ నొక్కండి.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "Add to Favorites",
      teluguTitle: "Add to Favorites",
      text: "You can add the lyrics to the Favorites section and later view them without searching for the song. 🤍 is there on the top of Lyrics Screen.",
      teluguText:
        "మీకు ఇష్టమైన పాటని Favorites లో సేవ్ చేసుకుని తరువాత చూసుకోవడానికి 🤍 ని నొక్కండి.",
      image: "",
      link: "",
      buttonName: "",
    },
    {
      id: uuid.v4(),
      title: "More Info on Lyrics Screen",
      teluguTitle: "పాట వివరాలు",
      text: "In the Lyrics Screen, there is a Menu option (i), right side of the song title. When you press it, you will see the Song Details like Genre, Time Signature, Artist.",
      teluguText:
        "Lyrics స్క్రీన్‌లో, పాట పేరుకి కుడి ప్రక్కన మెనూ ఆప్షన్ (i) ఉంటుంది. మీరు దాన్ని నొక్కినప్పుడు, పాట వివరాల కనిపిస్తాయి.",
      image: "",
      link: "",
      buttonName: "",
    },
  ];

  const handleLanguage = () => {
    setIsTelugu(!isTelugu);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}
    activeOpacity={1}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#1679AB", "#393E46", "#496989", "#9DBC98"]}
        style={styles.gradient}
      >
        <Text
          style={{
            color: "#E5D68A",
            fontSize: 18,
            textAlign: "auto",
            // fontFamily: "Poppins_600SemiBold",
            
          }}
        >
          {isTelugu ? item.teluguTitle : item.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 0,
            marginBottom: 6,
            textAlign: "justify",
            // fontFamily: "Poppins_400Regular",
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
              style={{ width: 150, alignItems:"center" }}
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
                  // fontFamily: "Poppins_400Regular",
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
            width: 160,
            borderRadius: 5,
           right:4,
          // marginLeft:185,
          // marginTop:220
          }}
        >
          <Text style={{textAlign:"center", fontSize: 15, fontFamily: "" }}>
            {isTelugu ? "Read in English" : "తెలుగు లో చదవండి"}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
      nestedScrollEnabled={true}
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
    width: 325,
    height: 225,
    // backgroundColor: "#242B2E",
    marginHorizontal: 5,
    // borderRadius: 10,
    // borderColor: "#392e4a",
    // borderWidth: 1,
  },
  gradient: {
    flex: 1,
    borderRadius:10,
    padding:8
  },
});

export default HorizontalCards;
