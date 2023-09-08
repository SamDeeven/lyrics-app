import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import alphabetData from "../../../data/songsData.js";
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
import HorizontalCards from "./HorizontalCards.js";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [suggestions, setSuggestions] = useState([]);
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

  useEffect(() => {
    if (inputSearch.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matchingSuggestions = [];

    Object.keys(alphabetData).forEach((alphabet) => {
      alphabetData[alphabet].forEach((item) => {
        if (
          item.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
          (item.keywords &&
            item.keywords.some((kw) =>
              kw.toLowerCase().startsWith(inputSearch.toLowerCase())
            ))
        ) {
          matchingSuggestions.push(item.title);
        }
      });
    });

    setSuggestions(matchingSuggestions);
  }, [inputSearch]);

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

  const navigateToRandomTitles = () => {
    navigation.navigate("RandomTitles");
  };

  const handleSearch = () => {
    if (inputSearch.length === 0) return;

    if (suggestions.length >= 0) {
      navigation.navigate("FilteredTitles", { searchQuery: inputSearch });
      setInputSearch("");
    }
  };

  const handleSuggestionPress = (suggestion) => {
    const matchingTitlesArray = [];

    Object.keys(alphabetData).forEach((alphabet) => {
      alphabetData[alphabet].forEach((item) => {
        if (
          item.title.toLowerCase() === suggestion.toLowerCase() ||
          (item.keywords &&
            item.keywords.some(
              (kw) => kw.toLowerCase() === suggestion.toLowerCase()
            ))
        ) {
          matchingTitlesArray.push(item);
        }
      });
    });

    if (matchingTitlesArray.length > 0) {
      navigation.navigate("Lyrics", { titleItem: matchingTitlesArray[0] });
      setInputSearch("");
    }
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
    <View>
    <View style={[styles.container]}>
      <View style={styles.inputBoxContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Song / పాటను వెతకండి"
          value={inputSearch}
          onChangeText={(text) => {
            setInputSearch(text);
          }}
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
        {suggestions.length > 0 && (
          <ScrollView style={styles.suggestionContainer}>
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
      <FlatList
        data={Object.keys(alphabetData)}
        renderItem={renderAlphabetItem}
        keyExtractor={(item) => item}
        numColumns={6}
        contentContainerStyle={styles.alphabetContainer}
      />
      <TouchableOpacity
        style={styles.randomBtn}
        onPress={navigateToRandomTitles}
      >
        <Text style={styles.randomBtnText}>5 Random Songs</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.horizontalCards}>
          <HorizontalCards />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    bottom:22,
  },
  inputBoxContainer: {},
  searchInput: {
    fontFamily: "Poppins_500Medium",
    height: 55,
    margin: 12,
    borderWidth: 1,
    paddingTop: 5,
    paddingHorizontal: 25,
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 18,
  },
  closeBtn: {
    position: "absolute",
    margin: 12,
    paddingTop: 11,
    right: 15,
  },
  suggestionContainer: {
    maxHeight: 300,
    position: "absolute",
    top: 70,
    zIndex: 1,
    left: 16,
    right: 16,
    backgroundColor: "#F2F1EF",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  suggestionItem: {
    paddingHorizontal: 25,
    margin: 3,
    padding: 10,
    borderWidth: 0.5,
  },
  suggestionText: {
    fontSize: 16,
  },
  alphabetContainer: {
    justifyContent: "space-between",
  },
  alphabetItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    height: 45,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  alphabetText: {
    fontSize: 23,
    fontWeight: "bold",
  },

  randomBtn: {
    backgroundColor: "#CAD5E2",
    width: 175,
    padding: 8,
    marginTop: 8,
    borderRadius: 10,
    alignSelf: "center",
  },
  randomBtnText: {
    color: "#120E43",
    fontSize: 20,
    textAlign: "center",
  },
  horizontalCards:{
    marginTop:25,
    bottom:50,
    marginLeft:5
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
