import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

const Favorites = ({navigation, route}) => {
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

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites(); 
    }, [])
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite songs yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lyrics", { titleItem: item })}
            style={styles.itemContainer}
          >
            <Text style={styles.titleText}>{item.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRemoveFavorite(item.id)}
            style={styles.removeButtonContainer}
          >
            <Icon name="trash-outline" style={styles.removeButton} />
          </TouchableOpacity>
        </View>
          )}
        />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontStyle: "italic",
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
    fontSize: 22,
  },});

export default Favorites;
