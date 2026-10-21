import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
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
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import { transliterateTelugu } from "../../utils/teluguTransliteration";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  NotoSansTelugu_400Regular,
} from "@expo-google-fonts/noto-sans-telugu";
import { Chilanka_400Regular } from "@expo-google-fonts/chilanka";
import { Mallanna_400Regular } from "@expo-google-fonts/mallanna";
import {
  BalooTammudu2_400Regular,
  BalooTammudu2_700Bold,
} from "@expo-google-fonts/baloo-tammudu-2";

const Lyrics = () => {
  const [fontSize, setFontSize] = useState(22);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedButton, setSelectedButton] = useState(18);
  // const [titleItem, setTitleItem] = useState(null);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [savedNotes, setSavedNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [showRomanLyrics, setShowRomanLyrics] = useState(false);

  const route = useRoute();
  const { titleItem } = route.params;

  // updated on 21 Oct 2026
  useEffect(() => {
    const checkFavoriteAndSaveRecentlyViewed = async () => {
      if (!titleItem) return;

      try {
        // 1. Existing functionality: Check whether the song is a favorite.
        const favoritesString = await AsyncStorage.getItem("favorites");
        const favorites = favoritesString ? JSON.parse(favoritesString) : [];

        const isSongFavorite = favorites.some(
          (song) => song.id === titleItem.id,
        );

        setIsFavorite(isSongFavorite);

        // 2. New functionality: Save the song to Recently Viewed.
        if (titleItem.id) {
          const recentlyViewedString =
            await AsyncStorage.getItem("recentlyViewed");

          let recentlyViewed = recentlyViewedString
            ? JSON.parse(recentlyViewedString)
            : [];

          // Remove an existing copy to prevent duplicates.
          recentlyViewed = recentlyViewed.filter(
            (song) => song.id !== titleItem.id,
          );

          // Put the current song first.
          recentlyViewed.unshift(titleItem);

          // Keep the latest 10 songs.
          recentlyViewed = recentlyViewed.slice(0, 10);

          await AsyncStorage.setItem(
            "recentlyViewed",
            JSON.stringify(recentlyViewed),
          );
        }
      } catch (error) {
        console.error(
          "Error checking favorite or saving recently viewed:",
          error,
        );
      }
    };

    checkFavoriteAndSaveRecentlyViewed();
  }, [titleItem?.id]);

  // telugu transliteration
  const displayLyrics = showRomanLyrics
    ? transliterateTelugu(titleItem.lyrics || "")
    : titleItem.lyrics || "";

  // notes related
  const NOTES_STORAGE_KEY = "songNotes";

  const openNotesModal = async () => {
    try {
      const notesString = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      const allNotes = notesString ? JSON.parse(notesString) : {};

      const songNotes = allNotes[titleItem.id] || "";

      setSavedNotes(songNotes);
      setNotesDraft(songNotes);
      setShowNotesModal(true);
    } catch (error) {
      console.error("Error loading song notes:", error);
      Alert.alert("Error", "Could not load notes for this song.");
    }
  };

  const cancelNotes = () => {
    // Discard unsaved edits.
    setNotesDraft(savedNotes);
    setShowNotesModal(false);
  };

  const saveNotes = async () => {
    if (savingNotes) return;

    try {
      setSavingNotes(true);

      const notesString = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      const allNotes = notesString ? JSON.parse(notesString) : {};

      allNotes[titleItem.id] = notesDraft;

      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(allNotes));

      setSavedNotes(notesDraft);
      setShowNotesModal(false);
    } catch (error) {
      console.error("Error saving song notes:", error);
      Alert.alert("Error", "Could not save your notes. Please try again.");
    } finally {
      setSavingNotes(false);
    }
  };

  // commented on 21 Oct 2026
  // useEffect(() => {
  //   // Check if the current song is a favorite when the component mounts
  //   const checkFavorite = async () => {
  //     try {
  //       const favoritesString = await AsyncStorage.getItem("favorites");
  //       let favorites = favoritesString ? JSON.parse(favoritesString) : [];
  //       const isSongFavorite = favorites.some(
  //         (song) => song.id === titleItem.id
  //       );
  //       setIsFavorite(isSongFavorite);
  //     } catch (error) {
  //       console.error("Error checking favorites:", error);
  //     }
  //   };
  //   checkFavorite();
  // }, [titleItem.id]);

  // useEffect(() => {
  //   setTitleItem(route.params.titleItem);
  //   checkFavorite(route.params.titleItem);
  // }, [route.params.titleItem]);

  // useEffect(() => {
  //   if (route.params?.titleItem) {
  //     setTitleItem(route.params.titleItem);
  //     checkFavorite(route.params.titleItem);
  //   }
  // }, [route.params?.titleItem]);

  const closeOptions = () => {
    setShowOptions(false);
  };

  const checkFavorite = async (item) => {
    if (!item) return;
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favorites = favoritesString ? JSON.parse(favoritesString) : [];
      const isSongFavorite = favorites.some((song) => song.id === item.id);
      setIsFavorite(isSongFavorite);
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  // const [fontsLoad] = useFonts({
  //   Poppins_100Thin,
  //   Poppins_100Thin_Italic,
  //   Poppins_200ExtraLight,
  //   Poppins_200ExtraLight_Italic,
  //   Poppins_300Light,
  //   Poppins_300Light_Italic,
  //   Poppins_400Regular,
  //   Poppins_400Regular_Italic,
  //   Poppins_500Medium,
  //   Poppins_500Medium_Italic,
  //   Poppins_600SemiBold,
  //   Poppins_600SemiBold_Italic,
  //   Poppins_700Bold,
  //   Poppins_700Bold_Italic,
  //   Poppins_800ExtraBold,
  //   Poppins_800ExtraBold_Italic,
  //   Poppins_900Black,
  //   Poppins_900Black_Italic,
  // });

  // if (!fontsLoad) {
  //   return <AppLoading />;
  // }

  const [fontsLoaded] = useFonts({
    NotoSansTelugu_400Regular,
    Chilanka_400Regular,
    Mallanna_400Regular,
    BalooTammudu2_400Regular,
    BalooTammudu2_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleFontSize = (size) => {
    let newFontSize = fontSize;

    if (size === "increase" && newFontSize < 38) {
      newFontSize += 2;
    } else if (size === "decrease" && newFontSize > 14) {
      newFontSize -= 2;
    } else if (size === "reset") {
      newFontSize === fontSize;
    }
    setFontSize(newFontSize);
    setSelectedButton(newFontSize);
  };

  const resetFontSize = () => {
    setFontSize(24);
  };
  const handleVideoButton = () => {
    if (titleItem.video) {
      const videoLink = Linking.openURL(titleItem.video);
    } else {
      Alert.alert("No video link available");
    }
  };

  // const handleVideoButton = () => {
  //   if (titleItem && titleItem.video) {
  //     const videoLink = Linking.openURL(titleItem.video);
  //     if (videoLink) {
  //       Linking.openURL(titleItem.video);
  //     }
  //   }
  //   else {
  //     Alert.alert("No video link available");
  //   }
  // };

  const handleFavoriteButton = async () => {
    if (!titleItem) return;
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      let favorites = favoritesString ? JSON.parse(favoritesString) : [];

      const isSongFavorite = favorites.some((song) => song.id === titleItem.id);

      if (isSongFavorite) {
        favorites = favorites.filter((song) => song.id !== titleItem.id);
        setIsFavorite(false);
      } else {
        favorites = [titleItem, ...favorites];
        setIsFavorite(true);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error handling favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        {/* LEFT: text size controls */}
        <View style={styles.sizeGroup}>
          <TouchableOpacity
            style={[
              styles.sizeButton,
              styles.sizeDivider,
              fontSize <= 14 && styles.disabledButton,
            ]}
            onPress={() => handleFontSize("decrease")}
            disabled={fontSize <= 14}
            accessibilityLabel="Decrease text size"
          >
            <Icon name="remove" size={22} color="#2C3E50" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sizeButton, styles.sizeDivider]}
            onPress={resetFontSize}
            accessibilityLabel="Reset text size"
          >
            <Icon name="refresh-outline" size={20} color="#2C3E50" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sizeButton, fontSize >= 38 && styles.disabledButton]}
            onPress={() => handleFontSize("increase")}
            disabled={fontSize >= 38}
            accessibilityLabel="Increase text size"
          >
            <Icon name="add" size={22} color="#2C3E50" />
          </TouchableOpacity>
        </View>

        {/* RIGHT: actions */}
        <View style={styles.actionGroup}>
          {/*language*/}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowRomanLyrics((previous) => !previous)}
            accessibilityRole="button"
            accessibilityLabel={
              showRomanLyrics
                ? "Show Telugu lyrics"
                : "Show English transliteration"
            }
          >
            <Text style={styles.languageButtonText}>
              {showRomanLyrics ? "తె" : "Aa"}
            </Text>
          </TouchableOpacity>

          {/* notes */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={openNotesModal}
            accessibilityLabel="Open song notes"
          >
            <Icon name="pencil" size={22} color="#2C3E50" />
          </TouchableOpacity>

          {/* favorite */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleFavoriteButton}
            accessibilityLabel="Toggle favorite"
          >
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "#2C3E50"}
            />
          </TouchableOpacity>

          {/* info (rightmost so the dropdown anchors to the screen edge) */}
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowOptions(!showOptions)}
              accessibilityLabel="Song info"
            >
              {showOptions ? (
                <Icon name="close-circle-sharp" size={24} color="#2C3E50" />
              ) : (
                <Icon
                  name="information-circle-outline"
                  size={24}
                  color="#2C3E50"
                />
              )}
            </TouchableOpacity>
            {showOptions && (
              <View style={styles.optionsDropdown}>
                <LinearGradient
                  start={{ x: 0.5, y: 1.5 }}
                  end={{ x: 1.5, y: 0 }}
                  colors={[
                    // "#9DBC98",
                    "#135D66",
                    // "#FFFB7D",
                    "#1679AB",
                    "#211951",
                    // "#2AF598",
                    "#393E46",
                    "#496989",
                  ]}
                  style={styles.gradient}
                >
                  <View style={styles.optionTextContainer}>
                    {titleItem.genre && titleItem.genre.length > 0 && (
                      <Text style={styles.genre}>
                        Genre: {titleItem.genre.join(" | ")}
                      </Text>
                    )}
                    {titleItem.timeSignature && (
                      <Text style={styles.timeSignature}>
                        Time Signature: {titleItem.timeSignature}
                      </Text>
                    )}
                    {titleItem.artist && (
                      <Text style={styles.artist}>
                        Artist: {titleItem.artist}
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Notes modal moved OUTSIDE the toolbar row (a Modal inside a
          space-between row can distort the spacing). Content is unchanged. */}
      <Modal
        visible={showNotesModal}
        transparent
        animationType="fade"
        onRequestClose={cancelNotes}
        statusBarTranslucent
      >
        <KeyboardAvoidingView
          style={styles.notesOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.notesModal}>
            <View
              // colors={["#135D66", "#1679AB", "#211951"]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 1, y: 1 }}
              style={styles.notesHeader}
            >
              <View style={styles.notesHeaderIcon}>
                <Icon name="musical-notes" size={20} color="#FFFFFF" />
              </View>

              <View style={styles.notesHeaderText}>
                <Text style={styles.notesHeading}>Song Notes</Text>
              </View>

              <TouchableOpacity
                onPress={cancelNotes}
                style={styles.notesCloseButton}
                accessibilityLabel="Cancel notes"
              >
                <Icon name="close" size={25} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.notesSongInfo}>
              <Icon name="musical-note" size={17} color="#1679AB" />
              <Text style={styles.notesSongTitle} numberOfLines={2}>
                {titleItem.title}
              </Text>
            </View>

            <Text style={styles.notesLabel}>YOUR NOTES</Text>

            <TextInput
              style={styles.notesInput}
              value={notesDraft}
              onChangeText={setNotesDraft}
              placeholder={"Write anything about this song...\n\n"}
              placeholderTextColor="#2C3E50"
              multiline
              textAlignVertical="top"
              autoCapitalize="sentences"
              autoCorrect
              maxLength={5000}
            />
            <View style={styles.notesActions}>
              <TouchableOpacity
                style={styles.notesCancelButton}
                onPress={cancelNotes}
                disabled={savingNotes}
              >
                <Text style={styles.notesCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.notesSaveButton,
                  savingNotes && { opacity: 0.6 },
                ]}
                onPress={saveNotes}
                disabled={savingNotes}
                activeOpacity={0.8}
              >
                <Icon name="save-outline" size={19} color="#FFFFFF" />
                <Text style={styles.notesSaveText}>
                  {savingNotes ? "Saving..." : "Save Notes"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Text style={styles.title}>{titleItem.title}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          <TouchableWithoutFeedback onPress={closeOptions}>
            <View style={{ marginTop: 5 }}>
              {displayLyrics ? (
                displayLyrics.split("\n").map((lyric, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.song,
                      { fontSize, lineHeight: fontSize + 15 },
                    ]}
                  >
                    {lyric}
                  </Text>
                ))
              ) : (
                <>
                  <Text style={styles.errorMessage}>
                    Sorry for the inconvenience! No lyrics available. App is
                    still under development.
                  </Text>
                  <Text style={styles.errorMessage}>
                    Kindly contact Sam Deeven (Vinnu)
                  </Text>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  videoBtn: {
    // marginTop: 8,
    // backgroundColor: "#E21717",
    // padding: 5,
    width: 50,
    borderRadius: 15,
    marginBottom: 4,
    alignSelf: "center",
  },
  videoBtnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    height: 30,
    textAlignVertical: "center",
  },
  options: {
    zIndex: 1,
  },
  optionsDropdown: {
    position: "absolute",
    top: 46,
    right: 0,
    width: 280,
    height: 280,
    padding: 8,
    borderRadius: 18,
  },
  optionTextContainer: {
    flex: 1,
    marginBottom: 10,
    height: 100,
    justifyContent: "center",
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  optionsText: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 15,
    marginLeft: 5,
  },
  favButtonContainer: {
    margin: 3,
    width: 50,
    // flex: 0.3,
    justifyContent: "center",
  },
  favButton: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    // flex: 0.8,
  },
  button: {
    // backgroundColor: "#02B290",
    // backgroundColor: "#1679AB",
    padding: 7,
    margin: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 14,
    borderWidth: 0.5,
    borderColor: "#2C3E50",
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },
  selectedButton: {
    backgroundColor: "#FF6666",
    color: "#FFD700",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    height: 30,
    marginTop: 0,
    color: "brown",
    backgroundColor: "#E6F7FF",
    width: 280,
  },
  lyricsContainer: {
    paddingTop: 5,
    flexGrow: 1,
  },
  song: {
    // lineHeight: 30,
    paddingLeft: 5,
    marginBottom: 3,
    fontFamily: "Mallanna_400Regular",
    color: "#2C3E50",
  },
  genre: {
    fontSize: 15,
    marginLeft: 5,
    paddingVertical: 5,
    color: "lightyellow",
  },
  timeSignature: {
    fontSize: 15,
    marginLeft: 5,
    paddingVertical: 5,
    color: "lightyellow",
  },
  artist: {
    fontSize: 15,
    marginLeft: 5,
    paddingVertical: 5,
    color: "lightyellow",
  },
  errorMessage: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 10,
    // fontFamily: "Poppins_700Bold_Italic",
    color: "red",
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 28,
  },

  notesButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    // backgroundColor: "#1679AB",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginTop: 8,
  },

  notesOverlay: {
    flex: 1,
    // backgroundColor: "rgba(10, 18, 32, 0.72)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 24,
  },

  notesModal: {
    width: "100%",
    maxWidth: 400,
    // height: "90%",
    // maxHeight: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    paddingBottom: 20,
    elevation: 12,
  },

  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 20,
    backgroundColor: "#2C3E50",
  },

  notesHeaderIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  notesHeaderText: {
    flex: 1,
    marginLeft: 12,
  },

  notesHeading: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  notesSubtitle: {
    fontSize: 12,
    color: "#DCEBFA",
    marginTop: 3,
  },

  notesCloseButton: {
    padding: 5,
    marginLeft: 5,
  },

  notesSongInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF7FC",
    marginHorizontal: 18,
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
  },

  notesSongTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
    marginLeft: 9,
  },

  notesLabel: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 9,
    color: "#2C3E50",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },

  notesInput: {
    minHeight: 100,
    maxHeight: 200,
    marginHorizontal: 18,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#D5E2EC",
    borderRadius: 15,
    backgroundColor: "#F8FAFD",
    color: "#243447",
    fontSize: 15,
    lineHeight: 23,
  },

  notesHint: {
    marginHorizontal: 20,
    marginTop: 8,
    fontSize: 11,
    color: "#2C3E50",
  },

  notesActions: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 20,
    gap: 12,
  },

  notesCancelButton: {
    flex: 1,
    height: 45,
    borderRadius: 13,
    borderWidth: 0.5,
    borderColor: "#CFD8E3",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  notesCancelText: {
    color: "#2C3E50",
    fontSize: 12,
    fontWeight: "600",
  },

  notesSaveButton: {
    flex: 1.4,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#2C3E50",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },

  notesSaveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  languageButton: {
    minWidth: 42,
    height: 42,
    paddingHorizontal: 8,
    borderRadius: 12,
    // backgroundColor: "#1679AB",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 3,
    marginTop: 8,
  },

  languageButtonText: {
    color: "#2C3E50",
    fontSize: 17,
    fontWeight: "bold",
  },

  // ---- toolbar layout (new) ----
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 6,
    zIndex: 10, // keeps the info dropdown above the title/lyrics
  },
  sizeGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#2C3E50",
    borderRadius: 14,
    overflow: "hidden",
  },
  sizeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeDivider: {
    borderRightWidth: 0.5,
    borderRightColor: "#2C3E50",
  },
  disabledButton: {
    opacity: 0.3,
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Lyrics;