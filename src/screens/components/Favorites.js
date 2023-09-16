import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
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
const Favorites = ({ navigation, route }) => {
  const [favorites, setFavorites] = useState([]);

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

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );
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
      ) : (
        <View>
          <View style={styles.clearButtonContainer}>
            <TouchableOpacity
              onPress={clearAllFavorites}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
              <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleRemoveFavorite(item.id)}
                  style={styles.removeButtonContainer}
                >
                  <MaterialIcons  style={styles.removeButton} name="delete-forever" size={26} color="black" />
                  {/* <Icon name="trash-outline" style={styles.removeButton} /> */}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  clearButtonContainer:{

  },
  clearButton:{

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    marginVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
    padding: 10,
    borderColor: "#049372",
    backgroundColor: "#049372",
    borderWidth: 4,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 18,
  },
  itemContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    color: "lightyellow",
  },
  removeButtonContainer: {
    marginRight: 10,
  },
  removeButton: {
    color: "white",
    // fontSize: 25,
  },
});

export default Favorites;
