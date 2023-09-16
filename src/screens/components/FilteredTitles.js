import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import alphabetData from "../../../data/songsData.js";
import { useSelector } from "react-redux";

const FilteredTitles = ({ route, navigation }) => {
  // const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

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
          // console.log("Matching Object==>", item);
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
    marginBottom: 8,
    borderWidth: 4,
    borderColor: "#049372",
    backgroundColor: "#049372",
    borderRadius: 5,
    padding: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color:"white",
  },
  emoji: {
    fontSize: 100,
    color: "black",
  },
});

export default FilteredTitles;
