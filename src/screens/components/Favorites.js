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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { MaterialIcons } from "@expo/vector-icons";

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, [])

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter((song) => song.id !== id);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error removing favorite:", error);
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
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  };
 
  // useFocusEffect(
  //   useCallback(() => {
  //     loadFavorites();
  //   }, [])
  // );
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

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <SafeAreaView>
          <ScrollView>
            <View>
              <Text style={styles.emptyText}>No favorite lyrics yet</Text>
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
          <View style={styles.clearButtonContainer}>
            <TouchableOpacity
              onPress={clearAllFavorites}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
              <MaterialIcons name="delete" size={25} color="lightyellow" />
            </TouchableOpacity>
          </View>
          <SafeAreaView>
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.favoriteItem}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Lyrics", { titleItem: item })
                    }
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
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 100,
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
    color: "lightyellow",
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
    fontFamily: "Poppins_600SemiBold_Italic",
    color: "#888",
    textAlign: "center",
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    padding: 3,
    paddingLeft: 5,
    borderColor: "#049372",
    backgroundColor: "#049372",
    borderWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
  },
  itemContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    color: "lightyellow",
  },
  removeButtonContainer: {
    marginRight: 10,
  },
  removeButton: {
    color: "white",
    color: "lightyellow",
  },
});

export default Favorites;
