import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


const About = () => {
  const [fontsLoad] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      <Text style={[styles.aboutTextGreet]}>Praise the Lord</Text>
      <Text style={[styles.bibleVerse]}>“I will praise the LORD all my life; I will sing praise to my God as long as I live.”{"\n"}Psalm 146:2</Text>
      <Text style={styles.aboutText}>{"\n"}Hello, I am Sam Deeven (Vinnu). I hope this app helps you in your church service for Song Lyrics without internet.</Text>
      <Text style={styles.subscribeText}>{"\n"}To listen and learn gospel songs and music, subscribe to my YouTube Channel</Text>
    <Icon name="caret-down-outline" size={30} color="#6A5ACD" />
    <TouchableOpacity style={styles.youtubeContainer} onPress={() => Linking.openURL("https://www.youtube.com/@SamDeeven/featured")}>
      <Text style={styles.youtubeText}>Open YouTube Channel</Text>
    </TouchableOpacity>
    <Text></Text>
    <Text></Text>
    <Text style={{color:"blue", width:120}}>App Version 1.0.8</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        bottom:50,
        marginTop:20,
    },
    aboutTextGreet:{
      textAlign:"center",
      width:300,
      fontSize:35,
      marginTop:30,
      marginBottom:40,
      color:"#800000",
      fontFamily:"Poppins_800ExtraBold"
    },
    bibleVerse:{
    color: "#6A5ACD",
    fontSize:25,
    marginHorizontal:18,
    textAlign:"center",
    fontFamily:"Poppins_600SemiBold"
    },
    aboutText:{
      fontSize: 22,
      marginHorizontal:20,
      textAlign:"justify",
      color:"#6A5ACD",
      fontFamily:"Poppins_300Light"
    },
    subscribeText:{
      fontSize: 24,
      marginHorizontal:20,
      textAlign:"center",
      color:"#6A5ACD",
      fontFamily:"Poppins_300Light"
    },
    youtubeContainer:{
      backgroundColor:"#FF0000",
      maxWidth:200,
      padding:10,
      borderRadius:20
    },
    youtubeText:{
      fontSize: 22,
      textAlign:"center",
      color:"white",
      fontFamily:"Poppins_400Regular"

    }
})

export default About;