import React, { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
  Modal
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
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/Ionicons";
import HorizontalCards from "./HorizontalCards.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Favorites from "./Favorites.js";
import {
  useFonts,
  NotoSansTelugu_400Regular,
} from "@expo-google-fonts/noto-sans-telugu";
import { Mallanna_400Regular } from "@expo-google-fonts/mallanna";

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const isFirstRender = useRef(true); // Track first render

  useEffect(() => {
    if (isFirstRender.current) {
      setModalVisible(true); // Show popup on first launch
      isFirstRender.current = false; // Prevent showing again on navigation
    }
  }, []);

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
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    if (inputSearch.trim() === "") {
      setSuggestions([]);
      return;
    }

    const matchingSuggestions = [];

    Object.keys(alphabetData).forEach((alphabet) => {
      alphabetData[alphabet].forEach((item) => {
        if (
          // item.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
          item.keywords &&
          item.keywords.some((kw) =>
            kw.toLowerCase().startsWith(inputSearch.toLowerCase())
          )
        ) {
          matchingSuggestions.push(item.title);
        }
      });
    });

    setSuggestions(matchingSuggestions);
  }, [inputSearch]);

  // const [fontsLoad] = useFonts({
  //   Poppins_300Light,
  //   Poppins_400Regular,
  //   Poppins_500Medium,
  //   Poppins_600SemiBold,
  //   Poppins_700Bold,
  //   Poppins_800ExtraBold,
  // });

  // if (!fontsLoad) {
  //   return <AppLoading />;
  // }

  const [fontsLoaded] = useFonts({
    NotoSansTelugu_400Regular,
    Mallanna_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const navigateToRandomTitles = () => {
    navigation.navigate("RandomTitles");
  };

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  };

  const handleSearch = () => {
    if (inputSearch.length === 0) return;

    if (suggestions.length >= 0) {
      navigation.navigate("FilteredTitles", { searchQuery: inputSearch });
      setInputSearch("");
    }
  };

  const handleSuggestionPress = async (suggestion) => {
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
      const item = matchingTitlesArray[0];
      try {
        let recentlyViewed = [];
        let recentlyViewedString = await AsyncStorage.getItem("recentlyViewed");
        recentlyViewed = recentlyViewedString
          ? JSON.parse(recentlyViewedString)
          : [];

        // Update recentlyViewed
        const existingIndex = recentlyViewed.findIndex((i) => i.id === item.id);

        if (existingIndex !== -1) {
          recentlyViewed.splice(existingIndex, 1);
        }

        recentlyViewed = [item, ...recentlyViewed.slice(0, 9)];

        await AsyncStorage.setItem(
          "recentlyViewed",
          JSON.stringify(recentlyViewed)
        );

        console.log("Updated recentlyViewed:", recentlyViewed);

        navigation.navigate("Lyrics", { titleItem: item });
      } catch (error) {
        console.error("Error handling recently viewed items:", error);
      }
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
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        nestedScrollEnabled={true}
      >
        <TouchableWithoutFeedback
          onPress={handleTapOutside && clearSuggestions}
        >
          <View style={{ flex: 1 }}>

<Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Welcome to Vinnu Lyrics App! 🎉</Text>
            <Text style={styles.modalText}>Enjoy the fresh, and clean new UI. Happy singing! 🎤🙌</Text>
            <Text style={styles.modalText}>Total Songs = 779</Text>

            
            {/* <Text style={styles.modalText}>New Update: Lent Songs Button is added</Text>
            <Text style={styles.modalText}>శ్రమదినాల పాటల కోసం ప్రత్యేకమైన బటన్ ని గమనించండి</Text> */}


            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

          <View style={[styles.topContainer]}>
            <View style={styles.inputBoxContainer}>
              <View style={{ flexDirection: "row", position: "relative" }}>
                <Icon
                  name="search-outline"
                  size={30}
                  style={{ position: "absolute", zIndex: 1, left: 18, top: 20 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="పాటను వెతకండి"
                  textAlign="center"
                  value={inputSearch}
                  onChangeText={(text) => {
                    setInputSearch(text);
                  }}
                  onSubmitEditing={handleSearch}
                  maxLength={30}
                  selectionColor={"brown"}
                  backgroundColor="white"
                  onFocus={() => setIsKeyboardActive(true)}
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

            <View style={styles.alphabetContainer}>
              {Object.keys(alphabetData).map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.alphabetItem}
                  onPress={() =>
                    navigation.navigate("TitlesList", { alphabet: item })
                  }
                >
                  <Text style={styles.alphabetText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.randomBtn}
                onPress={navigateToFavorites}
              >
                <Text style={styles.randomBtnText}>Favorite Songs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.randomBtn}
                onPress={navigateToRandomTitles}
              >
                <Text style={styles.randomBtnText}>Random Songs</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
              <TouchableOpacity
                style={styles.lentRandomBtn}
                onPress={() => navigation.navigate("LentSongsRandom")}
              >
                <Text style={styles.randomBtnText}>Lent Songs</Text>
                <Text style={styles.randomBtnText}>శ్రమదినాల పాటల</Text>

               
              </TouchableOpacity>
            </View> */}

            <View style={styles.horizontalCards}>
              <HorizontalCards />
            </View>
          </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 12,
  },
  inputBoxContainer: {
    alignSelf: "center",
  },
  searchInput: {
    // fontFamily: "Poppins_500Medium",
    height: 50,
    width: 300,
    paddingTop: 5,
    margin: 12,
    textAlign: "center",
    paddingHorizontal: 25,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 17,
    borderWidth:0.5
  },
  closeBtn: {
    position: "absolute",
    margin: 12,
    paddingTop: 4,
    right: 10,
    bottom: 9,
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
    margin: 4,
    padding: 12,
    // backgroundColor: "#1679AB",
    borderColor: "#2C3E50",
    borderWidth: 0.9,
    borderRadius: 16,
    shadowColor: "#000",
shadowOffset: {
  width: 0,
  height: 5, // A positive number pushes the shadow down
},
// shadowOpacity: 0.25,
// shadowRadius: 3.84,
// elevation: 5,

  },
  suggestionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    fontFamily: "NotoSansTelugu_400Regular",
  },
  alphabetContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  alphabetItem: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    height: 47,
    width: 47,
    // backgroundColor: "#02B290",
    // backgroundColor: "#F87A53",
   backgroundColor: "#E3F2FD",
   borderWidth:0.9,
   borderColor:"#2C3E50",
    borderRadius: 17,
  },
  alphabetText: {
    fontSize: 30,
    // fontFamily: "Poppins_600SemiBold",
    fontFamily: "Mallanna_400Regular",
    textAlign: "center",
    fontWeight: "bold",
    // marginTop:3,
    color: "#2C3E50",
  },

  randomBtn: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    // backgroundColor: "#3d5a80",
    borderColor: "#2C3E50",
    borderWidth: 0.9,
    width: 150,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },
  randomBtnText: {
    // color: "#120E43",
    color: "#2C3E50",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    // fontFamily: "Poppins_600SemiBold",
  },
  lentRandomBtn:{
backgroundColor:"#c3195d",
width: 150,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },
  horizontalCards: {
    marginTop: 15,
    marginBottom: 7,
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

  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: 250, padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeButton: { backgroundColor: "red", padding: 8, borderRadius: 5 },
  closeButtonText: { color: "white", fontWeight: "bold" },

});

export default Home;
