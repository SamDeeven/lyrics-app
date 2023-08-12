import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import alphabetData from "../../../data/songsData.json"; // Adjust the path accordingly
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

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const navigation = useNavigation();

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

  const renderAlphabetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.alphabetItem}
      onPress={() => navigation.navigate("TitlesList", { alphabet: item })}
    >
      <Text style={styles.alphabetText}>{item}</Text>
    </TouchableOpacity>
  );

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={90} style={styles.loader} color="#333" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(alphabetData)}
        renderItem={renderAlphabetItem}
        keyExtractor={(item) => item}
        numColumns={6}
        contentContainerStyle={styles.alphabetContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginBottom: 80,
  },
  alphabetContainer: {
    justifyContent: "space-between",
  },
  alphabetItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  alphabetText: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Home;
