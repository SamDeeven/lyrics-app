import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import alphabetData from "../../../data/songsData.json"; // Adjust the path accordingly
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
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../reducers/darkModeReducer";
import Icon from "react-native-vector-icons/Ionicons";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardActive(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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

  const handleSearch = () => {
    if (inputSearch.length === 0) return;
    navigation.navigate("FilteredTitles", { searchQuery: inputSearch });
    console.log("searched==> ", inputSearch);
    setInputSearch("");
  };

  const clearText = () => {
    setInputSearch("");
  };
  const renderAlphabetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.alphabetItem}
      onPress={() => navigation.navigate("TitlesList", { alphabet: item })}
    >
      <Text style={styles.alphabetText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <TouchableOpacity
        style={[styles.themeBtn, isDarkMode && styles.darkThemeBtn]}
        onPress={() => dispatch(toggleDarkMode())}
      >
        <Text
          style={[styles.themeBtnText, isDarkMode && styles.darkThemeBtnText]}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
      <View style={styles.inputBoxContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Song / పాటను వెతకండి"
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
          onSubmitEditing={handleSearch}
          maxLength={30}
          selectionColor={"brown"}
          backgroundColor="white"
        />
        {isKeyboardActive && (
          <Icon
            onPress={clearText}
            style={styles.closeBtn}
            name="close-sharp"
            size={30}
          />
        )}
      </View>
      <FlatList
        data={Object.keys(alphabetData)}
        renderItem={renderAlphabetItem}
        keyExtractor={(item) => item}
        numColumns={6}
        contentContainerStyle={styles.alphabetContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputBoxContainer: {
  },
  searchInput: {
    fontFamily: "Poppins_500Medium",
    height: 55,
    margin: 12,
    borderWidth: 1,
    paddingTop: 5,
    paddingHorizontal: 25,
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    fontSize:18,
  },
  closeBtn: {
    position: "absolute",
    margin: 12,
    paddingTop: 11,
    right: 15,
  },
  alphabetContainer: {
    justifyContent: "space-between",
  },
  alphabetItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 30,
  },
  alphabetText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  titleContainer: {
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "grey",
    backgroundColor: "lightblue",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  themeBtn: {
    backgroundColor: "black",
    width: 130,
    padding: 5,
    borderRadius: 10,
  },
  themeBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  darkModeContainer: {
    backgroundColor: "black",
  },
  darkThemeBtn: {
    backgroundColor: "white",
  },
  darkThemeBtnText: {
    color: "black",
  },
});

export default Home;
