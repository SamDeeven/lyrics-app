import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import songsData from '../../../data/songsData';
import {debounce} from 'lodash';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RandomTitles = ({navigation}) => {
  const [isRefresh, setIsRefresh] = useState(false);
    const generateRandomTitles = () => {
        const allTitles = Object.values(songsData).flat();
        const randomIndexes = [];
    
        while (randomIndexes.length < 6) {
          const randomIndex = Math.floor(Math.random() * allTitles.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        const selectedTitles = randomIndexes.map((index) => allTitles[index]);
        return selectedTitles;
      };
    
      const randomTitles = generateRandomTitles();
    
      const handleTitlePress = async (item) => {
        try {
          // const recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
          // let recentlyViewed = recentlyViewedString ? JSON.parse(recentlyViewedString) : [];
    
          // const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);
    
          // if (existingIndex !== -1) {
          //   recentlyViewed.splice(existingIndex, 1);
          // }
    
          // recentlyViewed = [item, ...recentlyViewed.slice(0, 9)]; // Limit to 10 items
          // await AsyncStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    
          navigation.navigate("Lyrics", { titleItem: item });
        } catch (error) {
          console.error("Error handling recently viewed items:", error);
        }
      };

      const pullRefresh = debounce(() => {
        if (!isRefresh) {
          setIsRefresh(true);
        }
        setTimeout(()=>{
           setIsRefresh(false);
        })
      })

  return (
    <View style={styles.container}>
      <FlatList
        data={randomTitles}
        renderItem={({ item }) => (
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
          )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefresh}
        onRefresh={pullRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal:12,
    marginBottom: 0,
    paddingBottom:0
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
  titleContainer: {
    marginBottom: 7,
    padding: 3,
    // paddingTop:2,
    paddingLeft:5,
    // backgroundColor: "#049372",
    backgroundColor: "#1679AB",
    borderTopLeftRadius: 20,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:20,
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
});

export default RandomTitles;
