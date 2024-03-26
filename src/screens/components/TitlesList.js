import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
import alphabetData from "../../../data/songsData.js";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TitlesList = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const route = useRoute();
  const navigation = useNavigation();
  const { alphabet } = route.params;
  const data = alphabetData[alphabet];
  const [filteredData, setFilteredData] = useState(data);

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

  const filterSongsByGenre = (genre) => {
    setSelectedGenre(genre);

    const filteredSongs =
      genre === "All"
        ? data
        : data.filter((song) => song.genre && song.genre.includes(genre));

    setFilteredData(filteredSongs);
  };

  const getUniqueGenres = () => {
    const genres = data.flatMap((song) => song.genre || []);
    return ["All", ...new Set(genres)];
  };

  const handleTitlePress = async (item) => {
    try {
      const recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
      let recentlyViewed = recentlyViewedString ? JSON.parse(recentlyViewedString) : [];

      const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);

      if (existingIndex !== -1) {
        recentlyViewed.splice(existingIndex, 1);
      }

      recentlyViewed = [item, ...recentlyViewed.slice(0, 9)]; 
      await AsyncStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));

      navigation.navigate("Lyrics", { titleItem: item });
    } catch (error) {
      console.error("Error handling recently viewed items:", error);
    }
  };
 
  

  return (
    <View style={[styles.container]}>
      <Text style={styles.alphabet}>{alphabet}</Text>

      <View>
        <Text style={{ fontSize: 20 }}>Filter</Text>
        <Picker
          prompt="Choose Genre"
          promptStyle={{ color: "yellow" }}
          dropdownIconColor={"#049372"}
          dropdownIconRippleColor={"#049372"}
          selectedValue={selectedGenre}
          onValueChange={(itemValue) => filterSongsByGenre(itemValue)}
          style={styles.picker}
        >
          {getUniqueGenres().map((genre) => (
            <Picker.Item
              key={genre}
              label={genre}
              value={genre}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredData}
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
    marginBottom: 7,
    borderWidth: 2,
    borderColor: "#049372",
    padding: 3,
    // paddingTop:2,
    paddingLeft:5,
    backgroundColor: "#049372",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
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
  picker: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#C2E4DD",
    marginHorizontal:5,
    padding: 3,

  },
  pickerItem: {
    color: "#049372",
    fontSize:22,
  },
});

export default TitlesList;
