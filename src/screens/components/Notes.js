import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import alphabetData from "../../../data/songsData.js";
import Icon from "../../utils/AppIcons";

// Same key Lyrics.js uses to save notes: { [songId]: "note text" }
const NOTES_STORAGE_KEY = "songNotes";

const Notes = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [notesById, setNotesById] = useState({});

  // Every song in data order (Telugu alphabet order), built once.
  const allSongs = useMemo(
    () => Object.keys(alphabetData).flatMap((letter) => alphabetData[letter]),
    []
  );

  // Reload every time the screen is opened, so notes edited in Lyrics show up.
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadNotes = async () => {
        try {
          const notesString = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
          const parsed = notesString ? JSON.parse(notesString) : {};

          if (isActive) {
            setNotesById(parsed && typeof parsed === "object" ? parsed : {});
          }
        } catch (error) {
          console.error("Error loading notes:", error);
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadNotes();

      return () => {
        isActive = false;
      };
    }, [])
  );

  // Only songs that actually have some note text.
  const songsWithNotes = useMemo(
    () =>
      allSongs
        .filter(
          (song) =>
            typeof notesById[song.id] === "string" &&
            notesById[song.id].trim().length > 0
        )
        .map((song) => ({ song, note: notesById[song.id].trim() })),
    [allSongs, notesById]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1679AB" />
      </View>
    );
  }

  const count = songsWithNotes.length;

  return (
    <View style={styles.container}>
      {count === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Icon name="pencil" size={34} color="#1679AB" />
          </View>
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptyText}>
            Open any song and tap the pencil icon to write a note. It will show
            up here.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.summary}>
            {count} {count === 1 ? "song" : "songs"} with notes
          </Text>

          <FlatList
            data={songsWithNotes}
            keyExtractor={(entry) => String(entry.song.id)}
            contentContainerStyle={styles.listContent}
            renderItem={({ item: entry }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Lyrics", { titleItem: entry.song })
                }
              >
                <View style={styles.cardHeader}>
                  <View style={styles.iconWrap}>
                    <Icon name="musical-note" size={18} color="#1679AB" />
                  </View>
                  <Text numberOfLines={2} style={styles.title}>
                    {entry.song.title}
                  </Text>
                </View>

                <View style={styles.noteBox}>
                  <Text style={styles.noteLabel}>YOUR NOTES</Text>
                  <Text numberOfLines={4} style={styles.noteText}>
                    {entry.note}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    fontSize: 14,
    fontWeight: "600",
    color: "#728198",
    marginTop: 10,
    marginBottom: 8,
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 20,
  },

  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.9,
    borderColor: "#2C3E50",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  noteBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#EFF7FC",
  },
  noteLabel: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1.2,
    color: "#728198",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#243447",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#728198",
    textAlign: "center",
  },
});

export default Notes;