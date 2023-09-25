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
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const Lyrics = () => {
  const [fontSize, setFontSize] = useState(18);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const route = useRoute();
  const { titleItem } = route.params;

  const closeOptions = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem("favorites");
        let favorites = favoritesString ? JSON.parse(favoritesString) : [];
        const isSongFavorite = favorites.some(
          (song) => song.id === titleItem.id
        );
        setIsFavorite(isSongFavorite);
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };

    checkFavorite();
  }, [titleItem.id]);

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

  const handleFontSize = (size) => {
    setFontSize(size);
  };

  const handleVideoButton = () => {
    if (titleItem.video) {
      const videoLink = Linking.openURL(titleItem.video);
      if (videoLink) {
        Linking.openURL(titleItem.video);
      }
    } else {
      Alert.alert("No video link available");
    }
  };

  const handleFavoriteButton = async () => {
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
      setFavorites(favorites);
    } catch (error) {
      console.error("Error handling favorites:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop:5 }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, fontSize === 14 && styles.selectedButton]}
            onPress={() => handleFontSize(14)}
          >
            <Text style={styles.buttonText}>Small</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, fontSize === 18 && styles.selectedButton]}
            onPress={() => handleFontSize(18)}
          >
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, fontSize === 22 && styles.selectedButton]}
            onPress={() => handleFontSize(22)}
          >
            <Text style={styles.buttonText}>Large</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
            {showOptions ? (
              <Icon style={{ fontSize: 40 }} name="close-outline" />
            ) : (
              <Icon name="ellipsis-vertical-sharp" size={35} />
            )}
          </TouchableOpacity>
          {showOptions && (
            <View style={styles.optionsDropdown}>
              <LinearGradient
                start={{ x: 0.5, y: 1 }}
                end={{ x: 1.5, y: 0 }}
                colors={[
                  "#85FFBD",
                  "#FFFB7D",
                  "#B5FFFC",
                  "#2AF598",
                  "#84fab0",
                  "#8fd3f4",
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
      <View style={{ flexDirection: "row", justifyContent:"center", marginBottom:-10 }}>
        {titleItem.video && (
          <View>
            <TouchableOpacity
              style={styles.videoBtn}
              onPress={handleVideoButton}
            >
              <Text style={styles.videoBtnText}>Video Song</Text>
            </TouchableOpacity>
          </View>
        )}
        <View>
          <TouchableOpacity
            style={styles.favButtonContainer}
            onPress={handleFavoriteButton}
          >
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={40}
              color={isFavorite ? "red" : "black"}
              style={styles.favButton}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>{titleItem.title}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          <TouchableWithoutFeedback onPress={closeOptions}>
            <View>
              {titleItem.lyrics ? (
                titleItem.lyrics.split("\n").map((lyric, index) => (
                  <Text key={index} style={[styles.song, { fontSize }]}>
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
    paddingHorizontal: 15,
  },
  videoBtn: {
    marginTop: 8,
    backgroundColor: "#E21717",
    padding: 5,
    width: 120,
    borderRadius: 15,
    marginBottom: 10,
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
    position: "absolute",
    zIndex: 1,
    top: 8,
    right: 25,
    alignItems: "flex-end",
    flex: 0.1,
  },
  optionsDropdown: {
    width: 310,
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
    fontSize: 18,
    marginLeft: 5,
  },
  favButtonContainer: {
    margin: 10,
    width: 50,
    // flex: 0.3,
    justifyContent: "center",
  },
  favButton: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    flex: 0.8,
  },
  button: {
    backgroundColor: "#333",
    padding: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    marginTop: 5,
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 0,
    color: "brown",
    width: 280,
  },
  lyricsContainer: {
    paddingTop: 5,
    flexGrow: 1,
  },
  song: {
    lineHeight: 27,
    paddingLeft: 5,
    marginBottom: 3,
  },
  genre: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
  },
  timeSignature: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
  },
  artist: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
  },
  errorMessage: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 10,
    fontFamily: "Poppins_700Bold_Italic",
    color: "red",
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
    padding: 8,
  },
});

export default Lyrics;
