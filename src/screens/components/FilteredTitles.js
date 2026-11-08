import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { searchSongs } from "../../utils/searchSongs";

import AsyncStorage from "@react-native-async-storage/async-storage";

const FilteredTitles = ({ route, navigation }) => {
  const { searchQuery = "" } = route.params || {};
  const matchingTitles = useMemo(() => searchSongs(searchQuery), [searchQuery]);

  const handleTitlePress = async (item) => {
    try {
      // let recentlyViewed = [];
      // let recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
      // recentlyViewed = recentlyViewedString
      //   ? JSON.parse(recentlyViewedString)
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


  return (
    <View style={styles.container}>
      {matchingTitles.length > 0 ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.queryText}>
            You searched for: "{searchQuery}" ({matchingTitles.length} found)
          </Text>

          <FlatList
            data={matchingTitles}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  style={styles.titleContainer}
                  onPress={() => handleTitlePress(item)}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.title}
                  >
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
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.queryText}>
            You searched for: "{searchQuery}"
          </Text>
          <View style={styles.errorContainer}>
            <Text style={styles.emoji}>☹️</Text>
            <Text style={styles.sorryMsg}>Sorry, no songs found!!!</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginBottom: 44,
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    marginVertical: 100,
  },
  queryText: {
    fontSize: 17,
    marginBottom: 15,
  },
  sorryMsg: {
    fontSize: 17,
    fontWeight: "bold",
    color: "brown",
  },
  titleContainer: {
    marginBottom: 7,
   
    // backgroundColor: "#2C3E50",
    borderRadius: 5,
    padding: 3,
    paddingLeft: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
      borderWidth:0.9,
   shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 5, // A positive number pushes the shadow down
},
shadowOpacity: 0.25,
shadowRadius: 3.84,
// elevation: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  genre: {
    fontSize: 10,
    color: "#2C3E50",
  },
  timeSignature: {
    fontSize: 10,
    color: "#2C3E50",
  },
  artist: {
    fontSize: 10,
    color: "#67717b",
  },
  emoji: {
    fontSize: 100,
    color: "black",
  },
});

export default FilteredTitles;