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
  Modal,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import alphabetData from "../../../data/songsData.js";
// import AppLoading from "expo-app-loading";
import Icon from "../../utils/AppIcons";
import HorizontalCards from "./HorizontalCards.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Favorites from "./Favorites.js";

// Space between the four action buttons (Favorite / Random / Recently Viewed / Notes)
const ACTION_GAP = 8;

const Home = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  // Screen width and text scale update live when the phone's
  // "Display size" / "Font size" setting changes.
  const { width, fontScale } = useWindowDimensions();

  // topContainer has 12px padding on each side
  const availableWidth = width - 24;
  // width each button would get if all 4 sat in a single row
  const oneRowButtonWidth = (availableWidth - ACTION_GAP * 3) / 4;
  // Too narrow (zoomed-in display) or very large text -> use 2 rows of 2
  const useTwoRows = oneRowButtonWidth < 78 || fontScale > 1.3;
  const actionButtonWidth = Math.floor(
    useTwoRows ? (availableWidth - ACTION_GAP) / 2 : oneRowButtonWidth,
  );

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
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardActive(false);
      },
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
            kw.toLowerCase().startsWith(inputSearch.toLowerCase()),
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

  const navigateToRandomTitles = () => {
    navigation.navigate("RandomTitles");
  };

  const navigateToFavorites = () => {
    navigation.navigate("Favorites");
  };

  const navigateToRecentlyViewed = () => {
    navigation.navigate("RecentlyViewed");
  };

  const navigateToNotes = () => {
    navigation.navigate("Notes");
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
              (kw) => kw.toLowerCase() === suggestion.toLowerCase(),
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
          JSON.stringify(recentlyViewed),
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

  // The four action buttons, rendered in one row or two rows (see useTwoRows)
  const actionButtons = [
    {
      key: "favorites",
      label: "Favorite Songs",
      style: styles.favoriteBtn,
      onPress: navigateToFavorites,
    },
    {
      key: "random",
      label: "Random Songs",
      style: styles.randomBtn,
      onPress: navigateToRandomTitles,
    },
    {
      key: "recent",
      label: "Recently Viewed",
      style: styles.recentlyViewedBtn,
      onPress: navigateToRecentlyViewed,
    },
    {
      key: "notes",
      label: "My Notes",
      style: styles.notesBtn,
      onPress: navigateToNotes,
    },
  ];

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
            {/* <Modal visible={modalVisible} transparent animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>
                    Welcome to Vinnu Lyrics App! 🎉
                  </Text>
                  <Text style={styles.modalText}>
                    Enjoy the fresh, and clean new UI. Happy singing! 🎤🙌
                  </Text>
                  <Text style={styles.modalText}>Total Songs = 786</Text>

                  <Text style={styles.modalText}>New Update: Lent Songs Button is added</Text>
            <Text style={styles.modalText}>శ్రమదినాల పాటల కోసం ప్రత్యేకమైన బటన్ ని గమనించండి</Text>

                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal> */}

            <View style={[styles.topContainer]}>
              {/* commented on 25th Oct 2026 */}

              {/* <View style={styles.inputBoxContainer}>
                <View style={{ flexDirection: "row", position: "relative" }}>
                  <Icon
                    name="search-outline"
                    size={30}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      left: 18,
                      top: 20,
                    }}
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
              </View> */}

              <View style={styles.inputBoxContainer}>
                <View style={styles.searchBar}>
                  <Icon name="search-outline" size={24} color="#2C3E50" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="పాటను వెతకండి"
                    placeholderTextColor="#8A99A8"
                    value={inputSearch}
                    onChangeText={(text) => {
                      setInputSearch(text);
                    }}
                    onSubmitEditing={handleSearch}
                    // returnKeyType="search"
                    maxLength={30}
                    selectionColor={"brown"}
                    onFocus={() => setIsKeyboardActive(true)}
                  />
                  {isKeyboardActive && inputSearch ? (
                    <TouchableOpacity
                      onPress={clearText}
                      style={styles.clearBtn}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    >
                      <Icon name="close-sharp" size={22} color="#2C3E50" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.clearBtn} />
                  )}
                </View>

                {suggestions.length > 0 && (
                  <View style={styles.suggestionCard}>
                    <View style={styles.suggestionHeader}>
                      <Text style={styles.suggestionHeaderText}>
                        {suggestions.length}{" "}
                        {suggestions.length === 1 ? "SONG" : "SONGS"} FOUND
                      </Text>
                    </View>

                    <ScrollView
                      nestedScrollEnabled={true}
                      keyboardShouldPersistTaps="handled"
                      style={styles.suggestionList}
                    >
                      {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                          key={`${suggestion}-${index}`}
                          activeOpacity={0.6}
                          style={[
                            styles.suggestionItem,
                            index === suggestions.length - 1 &&
                              styles.suggestionItemLast,
                          ]}
                          onPress={() => handleSuggestionPress(suggestion)}
                        >
                          <View style={styles.suggestionIconWrap}>
                            <Icon
                              name="musical-note"
                              size={16}
                              color="#1679AB"
                            />
                          </View>
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

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.seeAllBtn}
                      onPress={handleSearch}
                    >
                      <Icon name="search-outline" size={16} color="#FFFFFF" />
                      <Text style={styles.seeAllText}>See all results</Text>
                    </TouchableOpacity>
                  </View>
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

              {/* Action buttons: 4 in one row on normal screens,
                  2 + 2 on zoomed-in / large-text screens */}
              <View style={styles.actionRow}>
                {actionButtons.map((button) => (
                  <TouchableOpacity
                    key={button.key}
                    activeOpacity={0.8}
                    style={[
                      button.style,
                      styles.actionBtnBase,
                      { width: actionButtonWidth },
                    ]}
                    onPress={button.onPress}
                  >
                    <Text numberOfLines={2} style={styles.randomBtnText}>
                      {button.label}
                    </Text>
                  </TouchableOpacity>
                ))}
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
  // inputBoxContainer: {
  //   alignSelf: "center",
  // },
  // searchInput: {
  //   // fontFamily: "Poppins_500Medium",
  //   height: 50,
  //   width: 300,
  //   paddingTop: 5,
  //   margin: 12,
  //   textAlign: "center",
  //   paddingHorizontal: 25,
  //   borderTopLeftRadius: 25,
  //   borderBottomRightRadius: 25,
  //   borderTopRightRadius: 5,
  //   borderBottomLeftRadius: 5,
  //   fontSize: 15,
  //   borderWidth: 0.5,
  // },
  // closeBtn: {
  //   position: "absolute",
  //   margin: 12,
  //   paddingTop: 4,
  //   right: 10,
  //   bottom: 9,
  // },
  // micIcon: {
  //   paddingTop: 6,
  //   marginTop: 6,
  // },
  // suggestionContainer: {
  //   maxHeight: 300,
  //   position: "absolute",
  //   top: 60,
  //   zIndex: 1,
  //   left: 16,
  //   right: 16,
  //   backgroundColor: "#F2F1EF",
  //   borderWidth: 0.5,
  //   borderColor: "#ccc",
  //   borderRadius: 5,
  // },
  // suggestionItem: {
  //   paddingHorizontal: 25,
  //   margin: 4,
  //   padding: 12,
  //   // backgroundColor: "#1679AB",
  //   borderColor: "#2C3E50",
  //   borderWidth: 0.9,
  //   borderRadius: 16,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  // },

  // suggestionText: {
  //   fontSize: 15,
  //   fontWeight: "bold",
  //   color: "#2C3E50",
  // },

  // updated on 25th Oct 2026

  inputBoxContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 6,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.4,
    borderColor: "#2C3E50",
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: "#2C3E50",
    textAlign: "center",
  },
  clearBtn: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  suggestionCard: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D5E2EC",
    overflow: "hidden",
    elevation: 4,
    position: "absolute",
    top: 50,
    zIndex: 1,
    left: 16,
    right: 16,
  },
  suggestionHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#F4F9FD",
  },
  suggestionHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#728198",
  },
  suggestionList: {
    maxHeight: 260,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDE6EE",
  },
  suggestionItemLast: {
    borderBottomWidth: 0,
  },
  suggestionIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: "#2C3E50",
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    backgroundColor: "#2C3E50",
  },
  seeAllText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
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
    height: 45,
    width: 45,
    // backgroundColor: "#02B290",
    // backgroundColor: "#F87A53",
    backgroundColor: "#E3F2FD",
    borderWidth: 0.6,
    borderColor: "#2C3E50",
    borderRadius: 17,
  },
  alphabetText: {
    fontSize: 24,
    // fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontWeight: "bold",
    // marginTop:3,
    color: "#2C3E50",
  },

  // Holds the four action buttons; wraps into 2 rows when they don't fit
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: ACTION_GAP,
    marginTop: 8,
  },
  // Applied on top of each button's colour style: removes the old fixed
  // margins and centres the label (the width is set in the component)
  actionBtnBase: {
    margin: 0,
    marginTop: 0,
    minHeight: 46,
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "auto",
  },

  favoriteBtn: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    // backgroundColor: "#3d5a80",
    backgroundColor: "#C74767",
    // borderWidth: 0.5,
    width: 90,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },

  randomBtn: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    // backgroundColor: "#3d5a80",
    backgroundColor: "#3978C5",
    // borderWidth: 0.5,
    width: 90,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },
  recentlyViewedBtn: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    // backgroundColor: "#3d5a80",
    backgroundColor: "#278577",
    // borderWidth: 0.5,
    width: 90,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },
  randomBtnText: {
    // color: "#120E43",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    // fontFamily: "Poppins_600SemiBold",
  },

  notesBtn: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    // backgroundColor: "#3d5a80",
    backgroundColor: "#795548",
    // borderWidth: 0.5,
    width: 90,
    padding: 5,
    marginTop: 8,
    margin: 2,
    borderRadius: 8,
    alignSelf: "center",
  },
  notesBtnText: {
    // color: "#120E43",
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    // fontFamily: "Poppins_600SemiBold",
  },

  lentRandomBtn: {
    backgroundColor: "#c3195d",
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

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeButton: { backgroundColor: "red", padding: 8, borderRadius: 5 },
  closeButtonText: { color: "white", fontWeight: "bold" },
});

export default Home;