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


const Lyrics = ({ navigation }) => {
  const [fontSize, setFontSize] = useState(18);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const route = useRoute();
  const { titleItem } = route.params;
  console.log("TitleItem: ", titleItem.title);

  useEffect(() => {
    // Check if the current song is a favorite when the component mounts
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
    
      <View style={styles.options}>
  
        <Text onPress={() => setShowOptions(!showOptions)}>Options</Text>
        
        {showOptions && (
        
          <View style={styles.optionsDropdown}>
              <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#0a3431", "#407A52", "#4a9b7f", "#1c3e35"]}
        style={styles.gradient}
      >
            <View
              style={[styles.optionTextContainer, { flexDirection: "row" }]}
            >
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionsText}>Add to Favorites</Text>
              </View>
              <TouchableOpacity
                style={styles.favButtonContainer}
                onPress={handleFavoriteButton}
              >
                <Icon
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={40}
                  color={isFavorite ? "red" : "grey"}
                  style={styles.favButton}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionsText}>Font Size</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      fontSize === 14 && styles.selectedButton,
                    ]}
                    onPress={() => handleFontSize(14)}
                  >
                    <Text style={styles.buttonText}>Small</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      fontSize === 18 && styles.selectedButton,
                    ]}
                    onPress={() => handleFontSize(18)}
                  >
                    <Text style={styles.buttonText}>Medium</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      fontSize === 22 && styles.selectedButton,
                    ]}
                    onPress={() => handleFontSize(22)}
                  >
                    <Text style={styles.buttonText}>Large</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.optionTextContainer}>
                {titleItem.video && (
                  <TouchableOpacity
                    style={styles.videoBtn}
                    onPress={handleVideoButton}
                  >
                    <Text style={styles.videoBtnText}>Video Song</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            </LinearGradient>
          </View>
        )}
      </View>

      <Text style={styles.title}>{titleItem.title}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
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
                  Sorry for the inconvenience! No lyrics available. App is still
                  under development.
                </Text>
                <Text style={styles.errorMessage}>
                  Kindly contact Sam Deeven (Vinnu)
                </Text>
              </>
            )}
          </View>
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
    top: 10,
    right: 35,
    alignItems: "flex-end",
  },
  optionsDropdown: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
  },
  optionTextContainer: {
    flex: 1,
    marginBottom: 10,
    // backgroundColor: "lightyellow",
    height: 100,
    justifyContent: "center",
  },
  optionsText: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: 18,
    marginLeft:5,
    // backgroundColor: "#53E0BC",
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    // height: 60,
    marginBottom: 12,
  },
  favButtonContainer: {
    margin: 10,
    width: 50,
    flex: 0.3,
    justifyContent: "center",
  },
  favButton: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
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
    marginBottom: 10,
    marginTop: 10,
    color: "brown",
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
  errorMessage: {
    fontSize: 20,
    alignSelf: "center",
    paddingVertical: 10,
    fontFamily: "Poppins_700Bold_Italic",
    color: "red",
  },
    gradient: {
    // flex: 1,
    borderRadius:10,
    padding:8
  },
});

export default Lyrics;
