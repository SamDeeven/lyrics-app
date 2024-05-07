import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/components/Home";
import TitlesList from "./src/screens/components/TitlesList";
import Lyrics from "./src/screens/components/Lyrics";
import FilteredTitles from "./src/screens/components/FilteredTitles";
import RandomTitles from "./src/screens/components/RandomTitles";
import { Poppins_800ExtraBold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Contact from "./src/screens/components/Contact";
import About from "./src/screens/components/About";
import CustomHeader from "./src/screens/CustomHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Favorites from "./src/screens/components/Favorites";
import RecentlyViewed from "./src/screens/components/RecentlyViewed";
import alphabetData from "./data/songsData.js";
const Stack = createStackNavigator();

const App = () => {
  const [totalObjects, setTotalObjects] = useState(0);

  useEffect(() => {
    let count = 0;
    for (const key in alphabetData) {
      if (Array.isArray(alphabetData[key])) {
        count += alphabetData[key].length;
      }
    }
    setTotalObjects(count);
  }, []);

  const [fontsLoad] = useFonts({
    Poppins_800ExtraBold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#273A6F" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            style={styles.homeComponent}
            name="Home"
            component={Home}
            options={{
              header: () => (
                <CustomHeader
                  homeStyle={true}
                  title="Index"
                  showBackButton={false}
                  showHomeButton={false}
                  totalObjects={totalObjects}
                />
              ),
              animationEnabled: false,
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
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />

          <Stack.Screen
            name="TitlesList"
            component={TitlesList}
            options={{
              header: () => (
                <CustomHeader
                  title="Songs List"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              headerBackTitle: {
                height: 49,
              },
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: {
                backgroundColor: "#EAEAEA",
              },
            }}
          />
          <Stack.Screen
            name="FilteredTitles"
            component={FilteredTitles}
            options={{
              header: () => (
                <CustomHeader
                  title="Searched Songs"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />
          <Stack.Screen
            name="RandomTitles"
            component={RandomTitles}
            options={{
              header: () => (
                <CustomHeader
                  title="Random Songs"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />
          {/* <Stack.Screen
            name="Lyrics"
            component={Lyrics}
            options={{
              header: () => <CustomHeader title="Lyrics" showBackButton={true} showHomeButton={true}/>,
            animationEnabled:false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          /> */}
          <Stack.Screen
            name="Lyrics"
            component={Lyrics}
            options={({ route }) => ({
              header: () => (
                <CustomHeader
                  title={
                    route.params.titleItem.title.length
                      ? `${route.params.titleItem.title.substring(0, 23)}...`
                      : route.params.titleItem.title
                  }
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            })}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              header: () => (
                <CustomHeader
                  title="About"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              headerTitleAlign: "center",
              animationEnabled: false,
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              header: () => (
                <CustomHeader
                  title="Contact"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{
              header: () => (
                <CustomHeader
                  title="Favorites"
                  showBackButton={true}
                  showHomeButton={true}
                />
              ),
              animationEnabled: false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#EAEAEA" },
            }}
          />
          {/* <Stack.Screen
            name="RecentlyViewed"
            component={RecentlyViewed}
            options={{
              header: () => <CustomHeader title="Recently Viewed" showBackButton={true} showHomeButton={true}/>,
              animationEnabled:false,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#02B290",
                borderBottomWidth: 2,
                height: 70,
              },
              cardStyle: { backgroundColor: "#ECF0F1" },
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
