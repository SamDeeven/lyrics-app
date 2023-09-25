import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import alphabetData from "../../../data/songsData.js";

const FilteredTitles = ({ route, navigation }) => {

  const { searchQuery } = route.params;
  const [matchingTitles, setMatchingTitles] = useState([]);

  useEffect(() => {
    const matchingTitlesArray = [];

    Object.keys(alphabetData).forEach((alphabet) => {
      alphabetData[alphabet].forEach((item) => {
        if (
          // item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||

          (item.keywords &&
            item.keywords.some((kw) =>
              kw.toLowerCase().startsWith(searchQuery.toLowerCase())
            ))
        ) {
          matchingTitlesArray.push(item);
        }
      });
    });

    setMatchingTitles(matchingTitlesArray);
    // console.log("Matching Titles==> ", matchingTitlesArray);
  }, [searchQuery]);
  
  const handleTitlePress = (item) => {
    // console.log("FilteredTitles.js:", item);
    navigation.navigate("Lyrics", { titleItem: item });
  };

  return (
    <View style={styles.container}>
      {matchingTitles.length > 0 ? (
        <View>
          <Text style={styles.queryText}>
            You searched for: "{searchQuery}"
          </Text>

          <FlatList
            data={matchingTitles}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  style={styles.titleContainer}
                  onPress={() => handleTitlePress(item)}
                >
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.title}</Text>
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
        <View style={{flex:1}}>
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
    paddingHorizontal: 20,
    marginBottom: 44,
  },
  errorContainer: {
    alignItems: "center",
    flex: 1,
    marginVertical: 100
  },
  queryText: {
    fontSize: 22,
    marginBottom: 15,
  },
  sorryMsg: {
    fontSize: 24,
    fontWeight: "bold",
    color: "brown",
  },
  titleContainer: {
    marginBottom: 7,
    borderWidth: 2,
    borderColor: "#049372",
    backgroundColor: "#049372",
    borderRadius: 5,
    padding: 3,
    // paddingTop:2,
    paddingLeft:5,
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
  emoji: {
    fontSize: 100,
    color: "black",
  },

});

export default FilteredTitles;
