import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import alphabetData from "../../../data/songsData.json";
import { useSelector } from "react-redux";

const FilteredTitles = ({ route, navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const { searchQuery } = route.params;
  const [matchingTitles, setMatchingTitles] = useState([]);

  useEffect(() => {
    const matchingTitlesArray = [];

    Object.keys(alphabetData).forEach((alphabet) => {
      alphabetData[alphabet].forEach((item) => {
        if (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.keywords &&
            item.keywords.some((kw) =>
              kw.toLowerCase().startsWith(searchQuery.toLowerCase())
            ))
        ) {
          matchingTitlesArray.push(item);
          console.log("Matching Object==>", item);
        }
      });
    });

    setMatchingTitles(matchingTitlesArray);
    console.log("Matching Titles==> ", matchingTitlesArray);
  }, [searchQuery]);
  const handleTitlePress = (item) => {
    console.log("FilteredTitles.js:", item);
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
                  <Text style={styles.title}>{item.title}</Text>
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
    padding: 20,
    marginBottom: 85,
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
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "darkgrey",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emoji: {
    fontSize: 100,
    color: "black",
  },
});

export default FilteredTitles;
