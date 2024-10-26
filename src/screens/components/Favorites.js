import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useFonts, NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';

const Favorites = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
        setFavorites(favoritesData);
        filterFavoritesByGenre(selectedGenre, favoritesData);
        setIsLoading(false); // Set isLoading to false when data is loaded
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, [selectedGenre]);

  const filterFavoritesByGenre = (genre, data) => {
    setSelectedGenre(genre);
    const filteredSongs =
      genre === "All"
        ? data || favorites
        : (data || favorites).filter(
            (song) => song.genre && song.genre.includes(genre)
          );

    setFilteredFavorites(filteredSongs);
  };

  const getUniqueGenres = () => {
    const genres = favorites.flatMap((song) => song.genre || []);
    return ["All", ...new Set(genres)];
  };

  const handleRemoveFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter((song) => song.id !== id);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      filterFavoritesByGenre(selectedGenre, updatedFavorites);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleTitlePress = async (item) => {
    try {
      // let recentlyViewed = [];
      // let recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
      // recentlyViewed = recentlyViewedString
      //   ? JSON.parse(recentlyViewedString) || []
      //   : [];

      // const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);

      // if (existingIndex !== -1) {
      //   recentlyViewed.splice(existingIndex, 1);
      // }

      // recentlyViewed = [item, ...recentlyViewed.slice(0, 9)];
      // await AsyncStorage.setItem(
      //   "recentlyViewed",
      //   JSON.stringify(recentlyViewed)
      // );

      navigation.navigate("Lyrics", { titleItem: item });
    } catch (error) {
      console.error("Error handling recently viewed items:", error);
    }
  };

  const clearAllFavorites = async () => {
    try {
      Alert.alert(
        "Clear All Favorites",
        "Are you sure you want to clear all favorites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.removeItem("favorites");
              setFavorites([]);
              setFilteredFavorites([]);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };
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
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#049372" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filteredFavorites.length === 0 ? (
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.emptyText}>Empty</Text>
              <Image
                source={require("../../../assets/emptybox.jpg")}
                style={{
                  width: 320,
                  height: 300,
                  alignSelf: "center",
                  marginTop: 100,
                  borderRadius: 20,
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View>
          <View>
            <Picker
              prompt="Choose Genre"
              dropdownIconColor={"#1679AB"}
              dropdownIconRippleColor={"#1679AB"}
              selectedValue={selectedGenre}
              onValueChange={(itemValue) =>
                filterFavoritesByGenre(itemValue, favorites)
              }
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
          <View style={styles.clearButtonContainer}>
            <TouchableOpacity
              onPress={clearAllFavorites}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
              <MaterialIcons name="delete" size={25} color="white" />
            </TouchableOpacity>
          </View>
          <SafeAreaView>
            <FlatList
              data={filteredFavorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.favoriteItem}>
                  <TouchableOpacity
                    onPress={() => handleTitlePress(item)}
                    style={styles.itemContainer}
                  >
                    <Text style={styles.titleText}>{item.title}</Text>
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
                  <TouchableOpacity
                    onPress={() => handleRemoveFavorite(item.id)}
                    style={styles.removeButtonContainer}
                  >
                    <MaterialIcons
                      style={styles.removeButton}
                      name="delete-forever"
                      size={26}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    marginBottom: 232,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonContainer: {},
  clearButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "brown",
    borderRadius: 10,
  },
  clearButtonText: {
    textAlign: "center",
    width: 150,
    fontSize: 18,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
  emptyText: {
    fontSize: 18,
    // fontFamily: "Poppins_600SemiBold_Italic",
    color: "#888",
    textAlign: "center",
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 3,
    paddingLeft: 5,
    backgroundColor: "#1679AB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
  },
  itemContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    color: "white",
    fontFamily:"NotoSansTelugu_400Regular",

  },
  removeButtonContainer: {
    marginRight: 10,
  },
  removeButton: {
    color: "white",
    color: "lightyellow",
  },
  picker: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 7,
    backgroundColor: "#d0d4ec",
    marginHorizontal: 5,
    padding: 3,
  },
  pickerItem: {
    color: "#1679AB",
    fontSize: 20,
  },
});

export default Favorites;
