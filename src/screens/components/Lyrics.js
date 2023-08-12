import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
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

const Lyrics = () => {
  const [fontSize, setFontSize] = useState(17);
  const route = useRoute();
  const { titleItem } = route.params;

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, fontSize === 14 && styles.selectedButton]}
              onPress={() => handleFontSize(14)}
            >
              <Text style={styles.buttonText}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, fontSize === 17 && styles.selectedButton]}
              onPress={() => handleFontSize(17)}
            >
              <Text style={styles.buttonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, fontSize === 20 && styles.selectedButton]}
              onPress={() => handleFontSize(20)}
            >
              <Text style={styles.buttonText}>Large</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{titleItem.title}</Text>
          {titleItem.lyrics !== '' ? (
          <Text style={[styles.song, { fontSize }]}>{titleItem.lyrics}</Text>

          ) : (
            <>
          <Text style={styles.errorMessage}>No lyrics available</Text>
          <Text style={styles.errorMessage}>Kindly contact Sam Deeven (Vinnu)</Text>
          </>

          )
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAD2",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },

  selectedButton: {
    backgroundColor: "#FF6666",
    color: "#FFD700",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },

  song: {
    fontSize: 17,
    lineHeight: 25,
    paddingHorizontal: 10,
    minHeight: 1200,
  },
  errorMessage:{
    fontSize:20,
    alignSelf:"center",
    paddingVertical:10,
    fontFamily:"Poppins_700Bold_Italic",
    color:"red"
  }
});

export default Lyrics;
