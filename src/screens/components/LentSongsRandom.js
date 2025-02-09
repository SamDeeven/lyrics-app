// import React, { useState } from "react";
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
// import songsData from "../../../data/songsData"; // Adjust the path based on your project structure
// import { debounce } from "lodash";
// import { useFonts, NotoSansTelugu_400Regular } from "@expo-google-fonts/noto-sans-telugu";

// const LentSongsRandom = ({ navigation }) => {
//   const [isRefresh, setIsRefresh] = useState(false);

//   const generateLentSongs = () => {
//     const allTitles = Object.values(songsData).flat();

//     // 🎯 Custom Filtering for Lent Songs
//     // const lentSongs = allTitles.filter((song) =>
//     //   song.genre.some((g) => ["Lent", "Sin", "Cross", "Redemption", "Love"].includes(g))
//     // );

//     const lentSongs = allTitles.filter((song) =>
//         Array.isArray(song.genre) && song.genre.some((g) =>
//           ["Lent", "Sin", "Cross", "Redemption", "Love", "Surrender", "Hope", "Repentance", "Good Friday"].includes(g)
//         )
//       );

//     // 🔀 Get 10 Random Lent Songs
//     const randomIndexes = [];
//     while (randomIndexes.length < 6 && lentSongs.length > randomIndexes.length) {
//       const randomIndex = Math.floor(Math.random() * lentSongs.length);
//       if (!randomIndexes.includes(randomIndex)) {
//         randomIndexes.push(randomIndex);
//       }
//     }

//     return randomIndexes.map((index) => lentSongs[index]);
//   };

//   const randomLentSongs = generateLentSongs();

//   const handleTitlePress = (item) => {
//     navigation.navigate("Lyrics", { titleItem: item });
//   };

//   const pullRefresh = debounce(() => {
//     if (!isRefresh) {
//       setIsRefresh(true);
//     }
//     setTimeout(() => {
//       setIsRefresh(false);
//     });
//   });

//   const [fontsLoaded] = useFonts({
//     NotoSansTelugu_400Regular,
//   });

//   if (!fontsLoaded) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={randomLentSongs}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.titleContainer} onPress={() => handleTitlePress(item)}>
//             <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
//               {item.title}
//             </Text>
//             {item.genre && item.genre.length > 0 && (
//               <Text style={styles.genre}>Genre: {item.genre.join(" | ")}</Text>
//             )}
//             {item.timeSignature && <Text style={styles.timeSignature}>Time Signature: {item.timeSignature}</Text>}
//             {item.artist && <Text style={styles.artist}>Artist: {item.artist}</Text>}
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         refreshing={isRefresh}
//         onRefresh={pullRefresh}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     paddingHorizontal: 12,
//     marginBottom: 0,
//     paddingBottom: 0,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "white",
//     fontFamily: "NotoSansTelugu_400Regular",
//   },
//   titleContainer: {
//     marginBottom: 7,
//     padding: 3,
//     paddingLeft: 5,
//     backgroundColor: "#1679AB",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 5,
//     borderBottomLeftRadius: 5,
//     borderBottomRightRadius: 20,
//   },
//   genre: {
//     fontSize: 14,
//     color: "white",
//   },
//   timeSignature: {
//     fontSize: 14,
//     color: "white",
//   },
//   artist: {
//     fontSize: 12,
//     color: "lightpink",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default LentSongsRandom;

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import songsData from "../../../data/songsData";
import { useFonts, NotoSansTelugu_400Regular } from "@expo-google-fonts/noto-sans-telugu";

const availableGenres = ["Lent", "Sin", "Cross", "Redemption", "Love", "Surrender", "Hope", "Repentance", "Good Friday"];

const LentSongsRandom = ({ navigation }) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const allTitles = Object.values(songsData).flat();

  // Function to get 6 random Lent songs
  const getRandomSongs = useCallback(() => {
    let lentSongs = allTitles.filter((song) => song.genre && song.genre.includes("Lent"));

    // Shuffle and select 6 random songs
    const shuffled = [...lentSongs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 7);
  }, [allTitles]);

  const [randomSongs, setRandomSongs] = useState(getRandomSongs());

  // Function to filter songs by selected genre
  const getFilteredSongs = () => {
    if (selectedGenre === "All") {
      return randomSongs;
    }
    return randomSongs.filter((song) => song.genre.includes(selectedGenre));
  };

  const filteredSongs = getFilteredSongs();

  // Handle genre button press
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
  };

  // Refresh function
  const pullRefresh = () => {
    setIsRefresh(true);
    setRandomSongs(getRandomSongs()); // Get new 6 random songs
    setSelectedGenre("All"); // Reset filter to "All"
    setTimeout(() => setIsRefresh(false), 300);
  };

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

  return (
    <View style={styles.container}>
      {/* Genre Buttons */}
      <View style={styles.genreButtonsContainer}>
        <TouchableOpacity
          style={[styles.genreButton, selectedGenre === "All" && styles.selectedButton]}
          onPress={() => handleGenreSelection("All")}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>

        {availableGenres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[styles.genreButton, selectedGenre === genre && styles.selectedButton]}
            onPress={() => handleGenreSelection(genre)}
          >
            <Text style={styles.buttonText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Songs List */}
      <FlatList
        data={filteredSongs}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => navigation.navigate("Lyrics", { titleItem: item })}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {item.title}
            </Text>
            {item.genre && (
              <Text style={styles.genre}>Genre: {item.genre.join(" | ")}</Text>
            )}
             {item.timeSignature && (
                            <Text style={styles.timeSignature}>
                              Time Signature: {item.timeSignature}
                            </Text>
                          )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefresh}
        onRefresh={pullRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genreButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  genreButton: {
    backgroundColor: "#1679AB",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#049372",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  container: {
    flex: 1,
    padding: 16,
    marginBottom:-18
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    fontFamily: "NotoSansTelugu_400Regular",
  },
  titleContainer: {
    marginBottom: 7,
    padding: 3,
    paddingLeft: 5,
    backgroundColor: "#1679AB",
    borderRadius: 10,
  },
  genre: {
    fontSize: 14,
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeSignature: {
    fontSize: 11,
    color: "white",
  },
});

export default LentSongsRandom;
