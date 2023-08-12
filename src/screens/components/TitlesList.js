import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
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




const TitlesList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { alphabet } = route.params;
  const alphabetData = require('../../../data/songsData.json'); // Adjust the path accordingly
  const data = alphabetData[alphabet];

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

  const handleTitlePress = (item) => {
    navigation.navigate('Lyrics', { titleItem: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.alphabet}>{alphabet}</Text>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.titleContainer}
          onPress={() => handleTitlePress(item)}
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  alphabet: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'darkgrey',
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TitlesList;
