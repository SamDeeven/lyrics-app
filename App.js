import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/components/Home";
import TitlesList from "./src/screens/components/TitlesList";
import Lyrics from "./src/screens/components/Lyrics";
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
import 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          style={styles.homeComponent}
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Text
                style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 28 }}
              >
                Index
              </Text>
            ),
            headerTintColor: "blue",
            headerStyle: { backgroundColor: "#FFFACD" },
            headerTitleStyle: {
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: "Poppins_800ExtraBold",
            },
            headerTitleAlign: "center",
            cardStyle: { backgroundColor: "#E9967A" },
          }}
        />
        <Stack.Screen
          name="TitlesList"
          component={TitlesList}
          options={{
            headerTitle: () => (
              <Text
                style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 28 }}
              >
                Titles List
              </Text>
            ),
            headerTitleAlign: "left",
            headerStyle: { backgroundColor: "#FFFACD", borderBottomWidth: 3 },
            cardStyle: { backgroundColor: "#FAFAD2" },
          }}
        />
        <Stack.Screen
          name="Lyrics"
          component={Lyrics}
          options={{
            headerTitle: () => (
              <Text
                style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 28 }}
              >
                Lyrics
              </Text>
            ),
            headerTitleAlign: "left",
            headerStyle: { backgroundColor: "#FFFACD", borderBottomWidth: 3 },
            cardStyle: { backgroundColor: "#FAFAD2" },
          }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
