import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useSelector } from "react-redux";

const Lyrics = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [fontSize, setFontSize] = useState(18);
  const route = useRoute();
  const { titleItem } = route.params;
  // console.log("Received from Lyrics.js: ", titleItem);

  const [fontsLoad] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }

  const handleFontSize = (size) => {
    setFontSize(size);
  };

  const handleVideoButton = () => {
    if (titleItem.video) {
      const videoLink = Linking.openURL(titleItem.video);
      if (videoLink) {
        Linking.openURL(titleItem.video);
      }
    } else {
      Alert.alert("No video link available");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, fontSize === 14 && styles.selectedButton]}
          onPress={() => handleFontSize(14)}
        >
          <Text style={styles.buttonText}>Small</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, fontSize === 18 && styles.selectedButton]}
          onPress={() => handleFontSize(18)}
        >
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, fontSize === 22 && styles.selectedButton]}
          onPress={() => handleFontSize(22)}
        >
          <Text style={styles.buttonText}>Large</Text>
        </TouchableOpacity>
      </View>

      {titleItem.video && (
        <TouchableOpacity style={styles.videoBtn} onPress={handleVideoButton}>
          <Text style={styles.videoBtnText}>Video Song</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{titleItem.title}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          <View>
            {titleItem.lyrics !== "" ? (
              titleItem.lyrics.split("\n").map((lyric, index) => (
                <Text key={index} style={[styles.song, { fontSize }]}>
                  {lyric}
                </Text>
              ))
            ) : (
              <>
                <Text style={styles.errorMessage}>
                  Sorry for the inconvinience! No lyrics available. App is still
                  under development.
                </Text>
                <Text style={styles.errorMessage}>
                  Kindly contact Sam Deeven (Vinnu)
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FAFAD2",
    paddingHorizontal: 15,
    // marginBottom: 45,
  },
  videoBtn: {
    marginTop:8,
    backgroundColor: "#E21717",
    padding: 5,
    width: 100,
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: "center",
  },
  videoBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    marginTop:10
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },

  selectedButton: {
    backgroundColor: "#FF6666",
    color: "#FFD700",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop:10,
    color: "brown",
  },
  lyricsContainer: {
    paddingTop: 5,
    flexGrow: 1,
  },
  song: {
    lineHeight: 27,
    paddingLeft: 5,
    marginBottom:3

  },
  errorMessage: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 10,
    fontFamily: "Poppins_700Bold_Italic",
    color: "red",
  },
});

export default Lyrics;
