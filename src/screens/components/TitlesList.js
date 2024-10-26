import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator
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

// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import alphabetData from "../../../data/songsData.js";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';

const TitlesList = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const route = useRoute();
  const navigation = useNavigation();
  const { alphabet } = route.params;
  const data = alphabetData[alphabet];
  const [filteredData, setFilteredData] = useState(data);

  // const [fontsLoad] = useFonts({
  //   Poppins_100Thin,
  //   Poppins_100Thin_Italic,
  //   Poppins_200ExtraLight,
  //   Poppins_200ExtraLight_Italic,
  //   Poppins_300Light,
  //   Poppins_300Light_Italic,
  //   Poppins_400Regular,
  //   Poppins_400Regular_Italic,
  //   Poppins_500Medium,
  //   Poppins_500Medium_Italic,
  //   Poppins_600SemiBold,
  //   Poppins_600SemiBold_Italic,
  //   Poppins_700Bold,
  //   Poppins_700Bold_Italic,
  //   Poppins_800ExtraBold,
  //   Poppins_800ExtraBold_Italic,
  //   Poppins_900Black,
  //   Poppins_900Black_Italic,
  // });

  // if (!fontsLoad) {
  //   return <AppLoading />;
  // }

  const [fontsLoaded] = useFonts({
    NotoSansTelugu_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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

  const handleTitlePress = (item) => {
    try {
      // const recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
      // let recentlyViewed = recentlyViewedString ? JSON.parse(recentlyViewedString) : [];
  
      // // Check if the item is already in the recentlyViewed list
      // const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);
  
      // if (existingIndex !== -1) {
      //   // If the item is already in the recentlyViewed list, remove it
      //   recentlyViewed.splice(existingIndex, 1);
      // }
      
      // // Add the item to the top of the list
      // recentlyViewed.unshift(item);
      
      // // Limit the list to 10 items
      // if (recentlyViewed.length > 10) {
      //   recentlyViewed.pop(); // Remove the last item
      // }
  
      // await AsyncStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
  
      navigation.navigate("Lyrics", { titleItem: item });
    } 
    catch (error) {
      console.error("Error:", error);
    }
  };
  
 
  

  return (
    <View style={[styles.container]}>
      <Text style={styles.alphabet}>{alphabet}</Text>

      <View>
        <Text style={{ fontSize: 20 }}>Filter</Text>
        <Picker
          prompt="Choose Genre"
          promptStyle={{ color: "1679AB" }}
          dropdownIconColor={"#1679AB"}
          dropdownIconRippleColor={"#1679AB"}
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
    paddingHorizontal: 12,
    // marginBottom: 45,
  },
  darkContainer: {},
  alphabet: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop:4
  },
  titleContainer: {
    marginBottom: 7,
    // borderWidth: 2,
    // borderColor: "#455299",
    padding: 3,
    // paddingTop:2,
    paddingLeft:5,
    // backgroundColor: "#049372",
    backgroundColor: "#1679AB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,

  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    fontFamily:"NotoSansTelugu_400Regular",
  },
  genre: {
    fontSize: 14,
    color: "white",
  },
  timeSignature: {
    fontSize: 13,
    color: "white",
  },
  artist: {
    fontSize: 11,
    color: "#FFCDEA",
  },
  picker: {
    // width: "100%",
    marginBottom: 5,
    backgroundColor: "#d0d4ec",
    // marginHorizontal:5,
    padding: 3,

  },
  pickerItem: {
    color: "#1679AB",
    fontSize:22,
  },
});

export default TitlesList;
