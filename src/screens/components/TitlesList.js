import React from "react";
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

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { useSelector } from "react-redux";

import alphabetData from "../../../data/songsData.js";

const TitlesList = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const route = useRoute();
  const navigation = useNavigation();
  const { alphabet } = route.params;
  const data = alphabetData[alphabet];
  // console.log("video link", data)

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
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={styles.alphabet}>{alphabet}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => handleTitlePress(item)}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 32,
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
    borderColor: "darkgrey",
    padding: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TitlesList;
