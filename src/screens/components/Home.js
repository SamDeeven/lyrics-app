import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import alphabetData from "../../../data/songsData.js";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
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

  const handleTapOutside = () => {
    if (isKeyboardActive) {
      Keyboard.dismiss();
    }
  }

  const clearSuggestions = () => {
    setSuggestions([])    
  }


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
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
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
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps={"handled"} 
       nestedScrollEnabled={true}
      >
        {/* <TouchableWithoutFeedback onPress={handleTapOutside && clearSuggestions}> */}
          <View style={[styles.topContainer]}>
            <View style={styles.inputBoxContainer}>
              <View style={{ flexDirection: "row" }}>
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
                  onFocus={() => setIsKeyboardActive(true)}
                  clearButtonMode="always"
                />
              </View>

              {isKeyboardActive && inputSearch && (
                <Icon
                  onPress={clearText}
                  style={styles.closeBtn}
                  name="close-sharp"
                  size={30}
                />
              )}

              {suggestions.length > 0 && (
                <ScrollView
                  nestedScrollEnabled={true}
                  style={styles.suggestionContainer}
                >
                  {suggestions.map((suggestion) => (
                    <TouchableOpacity
                      key={suggestion}
                      style={styles.suggestionItem}
                      onPress={() => handleSuggestionPress(suggestion)}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.suggestionText}
                      >
                        {suggestion}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            <View>
              <FlatList
                data={Object.keys(alphabetData)}
                renderItem={renderAlphabetItem}
                keyExtractor={(item) => item}
                numColumns={6}
                contentContainerStyle={styles.alphabetContainer}
              />
            </View>

            <TouchableOpacity
              style={styles.randomBtn}
              onPress={navigateToRandomTitles}
            >
              <Text style={styles.randomBtnText}>6 Random Songs</Text>
            </TouchableOpacity>

            <View style={styles.horizontalCards}>
              <HorizontalCards />
            </View>
          </View>
        {/* </TouchableWithoutFeedback> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 18,
  },
  inputBoxContainer: {
    alignSelf: "center",
  },
  searchInput: {
    fontFamily: "Poppins_500Medium",
    height: 40,
    width: 325,
    paddingTop: 6,
    margin: 12,
    // borderWidth: 1,
    paddingHorizontal: 25,
    alignContent: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 15,
  },
  closeBtn: {
    position: "absolute",
    margin: 12,
    paddingTop: 4,
    right: 10,
    bottom: 4,
  },
  micIcon: {
    paddingTop: 6,
    marginTop: 6,
  },
  suggestionContainer: {
    maxHeight: 300,
    position: "absolute",
    top: 60,
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
    borderWidth: 0.7,
    borderRadius: 15,
  },
  suggestionText: {
    fontSize: 16,
  },
  alphabetContainer: {
    justifyContent: "space-between",
    // marginTop: -3,
  },
  alphabetItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    height: 50,
    backgroundColor: "#02B290",
    borderRadius: 20,
  },
  alphabetText: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginVertical: 3,
  },

  randomBtn: {
    backgroundColor: "#02B290",
    width: 250,
    padding: 5,
    marginTop: 8,
    borderRadius: 10,
    alignSelf: "center",
  },
  randomBtnText: {
    color: "#120E43",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
  horizontalCards: {
    marginTop: 15,
    // top: 315,
    marginLeft: -10,
    marginRight: -10,

    // position: "absolute",
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
