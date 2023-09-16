import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
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
import Icon from "react-native-vector-icons/Ionicons";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useSelector } from "react-redux";

import alphabetData from "../../../data/songsData.js";

const TitlesList = () => {
  // const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const route = useRoute();
  const navigation = useNavigation();
  const { alphabet } = route.params;
  const data = alphabetData[alphabet];
  const [isFavoriteItem, setIsFavoriteItem] = useState(false);


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

  const handleTitlePress = (item) => {
    navigation.navigate("Lyrics", { titleItem: item });
  };

  console.log("Loaded Titles==>");
  return (
    <View style={[styles.container]}>
      <Text style={styles.alphabet}>{alphabet}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => handleTitlePress(item)}
            >
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
                {item.title}
              </Text>
              {item.genre && item.genre.length > 0 && (
                <Text style={styles.genre}>
                  Genre: {item.genre.join(" | ")}
                </Text>
              )}
              {item.timeSignature && (
                <Text style={styles.timeSignature}>
                  Time Signature: {item.timeSignature}
                </Text>
              )}
              {item.artist && (
                <Text style={styles.artist}>Artist: {item.artist}</Text>
              )}
            </TouchableOpacity>
            </View>

        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // marginBottom: 45,
  },
  darkContainer: {},
  alphabet: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 8,
    borderWidth: 4,
    borderColor: "#049372",
    padding: 10,
    backgroundColor: "#049372",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "lightyellow",
  },
  genre: {
    fontSize: 14,
    color: "white",
  },
  timeSignature: {
    fontSize: 14,
    color: "white",
  },
  artist: {
    fontSize: 12,
    color: "lightpink",
  },
});

export default TitlesList;
