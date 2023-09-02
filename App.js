import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/components/Home";
import TitlesList from "./src/screens/components/TitlesList";
import Lyrics from "./src/screens/components/Lyrics";
import FilteredTitles from "./src/screens/components/FilteredTitles";
import RandomTitles from "./src/screens/components/RandomTitles";
import Menu from "./src/screens/components/Menu";
import { Poppins_800ExtraBold } from "@expo-google-fonts/poppins";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/Ionicons";
import Contact from "./src/screens/components/Contact";
import About from "./src/screens/components/About";
import Theme from "./src/screens/components/Theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  const [fontsLoad] = useFonts({
    Poppins_800ExtraBold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        style={styles.homeComponent}
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
              Index
            </Text>
          ),
          headerStyle: {
            backgroundColor: "#FFFACD",
            height: 85,
          },
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
            <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
              Titles List
            </Text>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFACD",
            borderBottomWidth: 2,
            height: 85,
          },
          cardStyle: {
            backgroundColor: "#FAFAD2",
            height: 1200,
          },
        }}
      />
      <Stack.Screen
        name="FilteredTitles"
        component={FilteredTitles}
        options={{
          headerTitle: () => (
            <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
              Filtered Titles
            </Text>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFACD",
            borderBottomWidth: 2,
            height: 85,
          },
          cardStyle: { backgroundColor: "#FAFAD2" },
        }}
      />
      <Stack.Screen
        name="Lyrics"
        component={Lyrics}
        options={{
          headerTitle: () => (
            <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
              Lyrics
            </Text>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFACD",
            borderBottomWidth: 2,
            height: 85,
          },
          cardStyle: { backgroundColor: "#FAFAD2" },
        }}
      />
      <Stack.Screen 
      name="About"
      component={About}
      options={{
        headerTitle: () => (
          <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
            About
          </Text>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFFACD",
          borderBottomWidth: 2,
          height: 85,
        },
        // cardStyle: { backgroundColor: "" },
      }}
      />
      <Stack.Screen 
      name="Contact"
      component={Contact}
      options={{
        headerTitle: () => (
          <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
            Contact
          </Text>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFFACD",
          borderBottomWidth: 2,
          height: 85,
        },
        // cardStyle: { backgroundColor: "#FAFAD2" },
      }}
      />
      <Stack.Screen 
      name="RandomTitles"
      component={RandomTitles}
      options={{
        headerTitle: () => (
          <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
            Random Titles
          </Text>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFFACD",
          borderBottomWidth: 2,
          height: 85,
        },
        cardStyle: { backgroundColor: "#FAFAD2" },
      }}
      />
       <Stack.Screen 
      name="Theme"
      component={Theme}
      options={{
        headerTitle: () => (
          <Text style={{ fontFamily: "Poppins_800ExtraBold", fontSize: 25 }}>
            Theme
          </Text>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#FFFACD",
          borderBottomWidth: 2,
          height: 85,
        },
        cardStyle: { backgroundColor: "#FAFAD2" },
      }}
      />
    </Stack.Navigator>
  );
};


const App = () => {
  const [fontsLoad] = useFonts({
    Poppins_800ExtraBold,
  });

  if (!fontsLoad) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, size, color }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
                size = focused ? 30 : 23;
                color = focused ? "black" : "#36454F";
              } else if (route.name === "Menu") {
                iconName = focused
                  ? "grid-sharp"
                  : "grid-outline";
                size = focused ? 30 : 23;
                color = focused ? "black" : "#36454F";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            activeTintColor: "black",
            inactiveTintColor: "#36454F",
            tabBarOptions: {
              activeTintColor: "black",
              borderRadius: 20,
            },
            tabBarStyle: {
              height: 56,
              position: "absolute",
              activeTintColor: "black",
              inactiveTintColor: "#36454F",
              bottom: 0,
            },
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "#36454F",
            tabBarActiveBackgroundColor: "lightgreen",
            tabBarInactiveBackgroundColor: "lightyellow",
          })}
        >
          <Tab.Screen
            name="Home"
            component={StackNavigator}
            options={() => ({
              headerShown: false,
              tabBarLabel: "Index",
              tabBarLabelStyle: {
                fontSize: 15,
              },
              tabBarOptions: {
                activeTintColor: "black",
              },
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: "bold",
              },
              tabBarIconStyle: {
                marginTop: 5,
              },
            })}
          />
          <Tab.Screen
            name="Menu"
            component={Menu}
            options={{
              headerShown:false,
              tabBarLabel: "Menu",
              tabBarLabelStyle: {
                fontSize: 15,
              },

              tabBarOptions: {
                activeTintColor: "black",
              },
              tabBarLabelStyle: {
                fontSize: 16,
                fontWeight: "bold",
              },
              tabBarIconStyle: {
                marginTop: 5,
              },
            }}
          />
        </Tab.Navigator>
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
});
export default App;
