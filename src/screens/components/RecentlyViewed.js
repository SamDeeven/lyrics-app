import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce } from "lodash";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

const RecentlyViewed = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredRecentlyViewed, setFilteredRecentlyViewed] = useState([]);

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      try {
        const recentlyViewedString = await AsyncStorage.getItem(
          "recentlyViewed"
        );
        const recentlyViewedData = recentlyViewedString
          ? JSON.parse(recentlyViewedString)
          : [];
        setRecentlyViewed(recentlyViewedData);
        filterRecentlyViewedByGenre(selectedGenre, recentlyViewedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading recently viewed items:", error);
      }
    };

    loadRecentlyViewed();
  }, []);

    const handleClearAllRecentlyViewed = async () => {
    try {
      Alert.alert(
        "Clear All",
        "Are you sure you want to clear all recently viewed items?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.removeItem("recentlyViewed");
              setRecentlyViewed([]);
              setFilteredRecentlyViewed([]);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error clearing recently viewed items:", error);
    }
  };
  const filterRecentlyViewedByGenre = (genre, data) => {
    setSelectedGenre(genre);
    const filteredSongs =
      genre === "All"
        ? data || recentlyViewed
        : (data || recentlyViewed).filter(
            (song) => song.genre && song.genre.includes(genre)
          );

    setFilteredRecentlyViewed(filteredSongs);
  };

   

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#049372" />
      </View>
    );
  }
    const getUniqueGenres = () => {
    const genres = recentlyViewed.flatMap((song) => song.genre || []);
    return ["All", ...new Set(genres)];
  };

  const handleTitlePress = async (item) => {
    try {
      const recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
      let recentlyViewed = recentlyViewedString
        ? JSON.parse(recentlyViewedString)
        : [];

      const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);

      if (existingIndex !== -1) {
        recentlyViewed.splice(existingIndex, 1);
      }

      recentlyViewed = [item, ...recentlyViewed.slice(0, 9)]; // Limit to 10 items
      await AsyncStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recentlyViewed)
      );

      navigation.navigate("Lyrics", { titleItem: item });
    } catch (error) {
      console.error("Error handling recently viewed items:", error);
    }
  };

  const pullRefresh = debounce(() => {
    if (!isRefresh) {
      setIsRefresh(true);
    }
    setTimeout(() => {
      setIsRefresh(false);
    });
  });

  return (
    <View style={styles.container}>
      {filteredRecentlyViewed.length === 0 ? (
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
              dropdownIconColor={"#049372"}
              dropdownIconRippleColor={"#049372"}
              selectedValue={selectedGenre}
              onValueChange={(itemValue) =>
                filterRecentlyViewedByGenre(itemValue, recentlyViewed)
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
              onPress={handleClearAllRecentlyViewed}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
              <MaterialIcons name="delete" size={25} color="lightyellow" />
            </TouchableOpacity>
          </View>
          <SafeAreaView>
            <FlatList
              data={filteredRecentlyViewed}
              keyExtractor={(item) => item.id.toString()}
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
                </View>
              )}
              refreshing={isRefresh}
              onRefresh={pullRefresh}
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
  picker: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 7,
    backgroundColor: "#C2E4DD",
    marginHorizontal: 5,
    padding: 3,
  },
  pickerItem: {
    color: "#049372",
    fontSize: 20,
  },
});

export default RecentlyViewed;
