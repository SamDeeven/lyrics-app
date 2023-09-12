import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/components/Home";
import TitlesList from "./src/screens/components/TitlesList";
import Lyrics from "./src/screens/components/Lyrics";
import FilteredTitles from "./src/screens/components/FilteredTitles";
import RandomTitles from "./src/screens/components/RandomTitles";
import { Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/Ionicons";
import Contact from "./src/screens/components/Contact";
import About from "./src/screens/components/About";
import CustomHeader from "./src/screens/CustomHeader";

const Stack = createStackNavigator();

const App = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptions = () => {
    setShowOptions(!showOptions);
  };
  const [fontsLoad] = useFonts({
    Poppins_800ExtraBold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#02B290" barStyle="light-content"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            style={styles.homeComponent}
            name="Home"
            component={Home}
            options={({navigation}) => ({
              header: () => <CustomHeader homeStyle={true} title="Index" showBackButton={false} showHomeButton={false}/>,
              headerMode:"float",
              headerStyle: {
                backgroundColor: "#02B290",
                height: 70,
              },
              headerTitleStyle: {
                fontSize: 28,
                fontWeight: "bold",
                fontFamily: "Poppins_800ExtraBold",
              },
              headerTitleAlign: "center",
              cardStyle: { backgroundColor: "#CAD5E2" },
            })}
          />

          <Stack.Screen
            name="TitlesList"
            component={TitlesList}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 5,
              //     }}
              //   >
              //     Titles List
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 5 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 5, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
            header:()=> <CustomHeader title="Titles List" showBackButton={true} showHomeButton={true}/>,
              headerBackTitle: {
                height: 49,
              },
              headerMode:"float",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },

              cardStyle: {
                backgroundColor: "#ECF0F1",
                height: 1200,
              },
            })}
          />
          <Stack.Screen
            name="FilteredTitles"
            component={FilteredTitles}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 5,
              //     }}
              //   >
              //     Filtered Titles
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 5 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // // headerBackgroundContainerStyle: {
              // //   height: 70,
              // // },
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 5, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
              header: () => <CustomHeader title="Filtered Titles" showBackButton={true} showHomeButton={true}/>,
              headerMode:"float",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            })}
          />
           <Stack.Screen
            name="RandomTitles"
            component={RandomTitles}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 5,
              //     }}
              //   >
              //     Random Titles
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 5 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 5, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
              header: () => <CustomHeader title="Random Titles" showBackButton={true} showHomeButton={true}/>,
             headerMode:"float",
              
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            })}
          />
          <Stack.Screen
            name="Lyrics"
            component={Lyrics}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 5,
              //     }}
              //   >
              //     Lyrics
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 5 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 5, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
              header: () => <CustomHeader title="Lyrics" showBackButton={true} showHomeButton={true}/>,
             headerMode:"float",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            })}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 25,
              //     }}
              //   >
              //     About
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 25 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 28, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
              header: () => <CustomHeader title="About" showBackButton={true} showHomeButton={true}/>,
              headerMode:"float",
             
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            })}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={({ navigation }) => ({
              // headerTitle: () => (
              //   <Text
              //     style={{
              //       fontFamily: "Poppins_800ExtraBold",
              //       fontSize: 25,
              //       bottom: 5,
              //     }}
              //   >
              //     Contact
              //   </Text>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              //     <Icon
              //       name="home-sharp"
              //       size={35}
              //       color="black"
              //       style={{ marginRight: 18, bottom: 5 }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerLeft: () => (
              //   <Icon
              //     style={{ bottom: 28, left: 10 }}
              //     name="arrow-back-outline"
              //     size={25}
              //   />
              // ),
              header: () => <CustomHeader title="Contact" showBackButton={true} showHomeButton={true}/>,
              headerMode:"float",

              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            })}
          />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  themeBtn: {
    backgroundColor: "#0C2626",
    padding: 10,
    marginRight: 15,
    borderRadius: 15,
    width: 100,
  },
  themeBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  menuContainer: {
    backgroundColor: "#ECF0F1",
    width: 300,
    position: "absolute",
    left: 0,
    top: 45,
    height: 150,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  menuItemsBtn: {
    margin: 6,
    paddingVertical: 5,
    backgroundColor: "#53E0BC",
    borderRadius: 10,
  },
  menuItemsBtnText: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
export default App;
