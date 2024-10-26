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
  ActivityIndicator 
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
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, NotoSansTelugu_400Regular } from '@expo-google-fonts/noto-sans-telugu';


const Lyrics = () => {
  const [fontSize, setFontSize] = useState(22);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedButton, setSelectedButton] = useState(18);
  // const [titleItem, setTitleItem] = useState(null);

  const route = useRoute();
  const { titleItem } = route.params;

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

    if (size === "increase" && newFontSize < 32) {
      newFontSize += 2;
    } else if (size === "decrease" && newFontSize > 10) {
      newFontSize -= 2;
    } else if (size === "reset") {
      newFontSize === fontSize;
    }
    setFontSize(newFontSize);
    setSelectedButton(newFontSize);
  };

  const resetFontSize = () => {
    setFontSize(20);
  };
  const handleVideoButton = () => {
    if (titleItem.video) {
      const videoLink = Linking.openURL(titleItem.video);
      // if (videoLink) {
      //   Linking.openURL(titleItem.video);
      // }
    } 
    else {
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
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, fontSize === "decrease"]}
            onPress={() => handleFontSize("decrease")}
          >
            <Icon name="remove-circle" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={resetFontSize}>
            <Icon name="refresh-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => handleFontSize("increase")}
          >
            <Icon name="add-circle" size={20} color="white" />
          </TouchableOpacity>

          {titleItem.video && (
            <View>
              <TouchableOpacity
                style={styles.videoBtn}
                onPress={handleVideoButton}
              >
                <Icon name="logo-youtube" size={50} color="red" />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.favButtonContainer}
            onPress={handleFavoriteButton}
          >
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={45}
              color={isFavorite ? "red" : "black"}
              style={styles.favButton}
            />
          </TouchableOpacity>

          <View style={styles.options}>
            <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
              {showOptions ? (
                <Icon style={{ fontSize: 40 }} name="close-circle-sharp" />
              ) : (
                <Icon name="information-circle-outline" size={40} />
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: -10,
          }}
        >
          {/* {titleItem.video && (
          <View>
            <TouchableOpacity
              style={styles.videoBtn}
              onPress={handleVideoButton}
            >
              <Icon name="logo-youtube" size={50} color="red"/>
            </TouchableOpacity>
          </View>
        )} */}
          <View>
            {/* <TouchableOpacity
            style={styles.favButtonContainer}
            onPress={handleFavoriteButton}
          >
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={45}
              color={isFavorite ? "red" : "black"}
              style={styles.favButton}
            />
          </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={styles.options}>
          <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
            {showOptions ? (
              <Icon style={{ fontSize: 30 }} name="close-circle-sharp" />
            ) : (
              <Icon name="information-circle-outline" size={30} />
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
        </View> */}
      </View>

      <Text style={styles.title}>{titleItem.title}</Text>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          <TouchableWithoutFeedback onPress={closeOptions}>
            <View style={{ marginTop: 5 }}>
              {titleItem.lyrics ? (
                titleItem.lyrics.split("\n").map((lyric, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.song,
                      { fontSize, lineHeight: fontSize + 8 },
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
    width: 55,
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
    // position: "absolute",
    zIndex: 1,
    marginTop:8,
    // top: 12,
    // right: -40,
    // alignItems: "flex-end",
    // flex: 0.1,
  },
  optionsDropdown: {
       position: "absolute",
         top: 50,
         right:-15,
    width: 300,
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
    backgroundColor: "#1679AB",
    padding: 7,
    margin: 10,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 14,
    borderWidth: 1,
    borderColor: "#1679AB",
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    height:30,
    marginTop: 0,
    color: "brown",
    backgroundColor:"#E6F7FF",
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
    fontFamily:"NotoSansTelugu_400Regular",

  },
  genre: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
    color:"lightyellow"
  },
  timeSignature: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
    color:"lightyellow"
  },
  artist: {
    fontSize: 18,
    marginLeft: 5,
    paddingVertical: 5,
    color:"lightyellow"
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
});

export default Lyrics;
