import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import songsData from '../../../data/songsData';
import {debounce} from 'lodash';

const RandomTitles = ({navigation}) => {
  const [isRefresh, setIsRefresh] = useState(false);
    const generateRandomTitles = () => {
        const allTitles = Object.values(songsData).flat();
        const randomIndexes = [];
    
        while (randomIndexes.length < 5) {
          const randomIndex = Math.floor(Math.random() * allTitles.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
        const selectedTitles = randomIndexes.map((index) => allTitles[index]);
        return selectedTitles;
      };
    
      const randomTitles = generateRandomTitles();
    
      const handleTitlePress = (item) => {
        navigation.navigate('Lyrics', { titleItem: item });
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

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 4,
    borderColor: 'darkgrey',
    padding: 10,
    borderTopLeftRadius: 18,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:18,
  },
});

export default RandomTitles;
