
import React, { useState, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = Math.min(screenWidth * 0.76, 280);

const DATA = [
  {
    id: "subscribe-music",
    title: "Subscribe to Listen and Learn Music",
    teluguTitle: "పాటలు వినడానికి & కీబోర్డ్ నేర్చుకోవడానికి",
    text: "Find worship songs and keyboard tutorials on our YouTube channel.",
    teluguText: "ఈ యూట్యూబ్ ఛానల్‌లో ఆరాధన పాటలు మరియు కీబోర్డ్ ఎలా నేర్చుకోవాలో తెలుసుకోవచ్చు.",
    link: "https://www.youtube.com/@SamDeeven",
    buttonName: "Subscribe on YouTube",
    colors: ["#123B5D", "#176B87", "#263C63"],
  },
  {
    id: "subscribe-church",
    title: "Subscribe to Our Church Channel",
    teluguTitle: "మన సంఘ ఛానల్‌ను సబ్‌స్క్రైబ్ చేయండి",
    text: "Watch our church worship services and live videos.",
    teluguText: "మన సంఘ ఆరాధన కార్యక్రమాలు మరియు లైవ్ వీడియోలను చూడవచ్చు.",
    link: "https://www.youtube.com/@HSBCKAKINADA/streams",
    buttonName: "Watch Church Videos",
    colors: ["#7F1D1D", "#C62828", "#6A1B9A"],
  },
  {
    id: "about-app",
    title: "About This App",
    teluguTitle: "ఈ యాప్ గురించి",
    text: "Vinnu Lyrics helps you view song lyrics during church services, even without internet.",
    teluguText: "చర్చిలో ఆరాధన పాటలను ఇంటర్నెట్ లేకుండానే చూసి అందరితో కలిసి పాడటానికి ఈ యాప్ ఉపయోగపడుతుంది.",
    colors: ["#00695C", "#00897B", "#004D40"],
  },
  {
    id: "search",
    title: "Search Your Favorite Songs",
    teluguTitle: "మీకు ఇష్టమైన పాటను వెతకండి",
    text: "Search by song title or lyrics to find matching songs quickly.",
    teluguText: "పాట పేరు లేదా పాటలోని పదాలను టైప్ చేసి మీకు కావలసిన పాటను సులభంగా వెతకండి.",
    colors: ["#4527A0", "#673AB7", "#283593"],
  },
  {
    id: "random-songs",
    title: "6 Random Songs",
    teluguTitle: "ఏవైనా 6 పాటలు",
    text: "Get six random songs. Pull down to refresh if you want a different selection.",
    teluguText: "ఏవైనా ఆరు పాటలను చూడండి. వేరే పాటలు కావాలంటే జాబితాను కిందికి లాగి రిఫ్రెష్ చేయండి.",
    colors: ["#AD1457", "#D81B60", "#880E4F"],
  },
  {
    id: "menu",
    title: "Home Screen Menu",
    teluguTitle: "హోమ్ స్క్రీన్ మెనూ",
    text: "Open the menu at the top of the Home Screen to access available options.",
    teluguText: "అందుబాటులో ఉన్న ఎంపికలను చూడటానికి హోమ్ స్క్రీన్ పైన ఉన్న మెనూను తెరవండి.",
    colors: ["#E65100", "#F57C00", "#BF360C"],
  },
  {
    id: "font-size",
    title: "Adjust Lyrics Font Size",
    teluguTitle: "అక్షరాల పరిమాణం",
    text: "Increase, decrease, or reset the lyrics font size for comfortable reading.",
    teluguText: "సౌకర్యంగా చదవడానికి పాట అక్షరాల పరిమాణాన్ని పెంచండి, తగ్గించండి లేదా మళ్లీ సరిచేయండి.",
    colors: ["#4E342E", "#795548", "#3E2723"],
  },
  {
    id: "video",
    title: "Video Song Option",
    teluguTitle: "పాట వీడియో ఎంపిక",
    text: "Open the available YouTube video to listen to or learn the song.",
    teluguText: "పాటను వినడానికి లేదా నేర్చుకోవడానికి అందుబాటులో ఉన్న YouTube వీడియోను తెరవండి.",
    colors: ["#0277BD", "#039BE5", "#01579B"],
  },
  {
    id: "favorites",
    title: "Add Songs to Favorites",
    teluguTitle: "ఇష్టమైన పాటలు",
    text: "Save songs to Favorites and find them easily later, without searching again.",
    teluguText: "మీకు ఇష్టమైన పాటలను ఫేవరెట్స్‌లో సేవ్ చేసి తరువాత సులభంగా చూడండి.",
    colors: ["#C62828", "#E53935", "#880E4F"],
  },
  {
    id: "song-details",
    title: "Expand / Collapse Song Details",
    teluguTitle: "పాట వివరాలు: తెరవండి / మూసివేయండి",
    text: "Expand a song in the titles list to see its genre, time signature, and artist. Collapse it to keep the list compact.",
    teluguText: "పాటల జాబితాలో పాటను విస్తరించి దాని జానర్, టైమ్ సిగ్నేచర్, గాయకుడి వివరాలు చూడండి. జాబితాను చిన్నగా ఉంచడానికి మళ్లీ మూసివేయండి.",
    colors: ["#827717", "#AFB42B", "#558B2F"],
  },
  {
    id: "notes",
    title: "Personal Song Notes",
    teluguTitle: "పాటల వ్యక్తిగత నోట్స్",
    text: "Write, save, and edit personal notes for each song. Saved notes remain available offline.",
    teluguText: "ప్రతి పాటకు వ్యక్తిగత నోట్స్ రాసి సేవ్ చేయండి. అవసరమైనప్పుడు వాటిని మళ్లీ తెరిచి మార్చుకోండి. సేవ్ చేసిన నోట్స్‌ను ఇంటర్నెట్ లేకుండానే చూడవచ్చు.",
    colors: ["#6A1B9A", "#8E24AA", "#4A148C"],
  },
  {
    id: "language",
    title: "Telugu / English Language Switch",
    teluguTitle: "తెలుగు / ఇంగ్లీష్ భాష మార్పు",
    text: "Use the language switch to read supported descriptions in Telugu or English.",
    teluguText: "భాష మార్చే బటన్ ద్వారా అందుబాటులో ఉన్న వివరణలను తెలుగు లేదా ఇంగ్లీష్‌లో చదవండి.",
    colors: ["#006064", "#0097A7", "#00838F"],
  },
  {
    id: "recently-viewed",
    title: "Recently Viewed Songs",
    teluguTitle: "ఇటీవల చూసిన పాటలు",
    text: "Quickly reopen songs you viewed recently from the Recently Viewed section.",
    teluguText: "ఇటీవల చూసిన పాటలను రీసెంట్‌లీ వ్యూడ్ విభాగం నుంచి త్వరగా మళ్లీ తెరవండి.",
    colors: ["#283593", "#3949AB", "#1A237E"],
  },
];

export default function HorizontalCards() {
  const [isTelugu, setIsTelugu] = useState(false);

  const handleLanguage = useCallback(() => {
    setIsTelugu((previous) => !previous);
  }, []);

  const openLink = useCallback(async (url) => {
    if (!url) return;

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert(
        "Unable to open link",
        "Please check your connection and try again."
      );
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <Pressable style={styles.card}>
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>
                {String(index + 1).padStart(2, "0")}
              </Text>
            </View>
            <View style={styles.headerAccent} />
          </View>

          <Text style={styles.title}>
            {isTelugu ? item.teluguTitle : item.title}
          </Text>

          <Text style={styles.description}>
            {isTelugu ? item.teluguText : item.text}
          </Text>

          {item.buttonName ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => openLink(item.link)}
              style={styles.subscribeButton}
            >
              <Text style={styles.subscribeText}>
                {item.buttonName}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.cardFooter}>
            <Text style={styles.footerLabel}>
              {isTelugu ? "విన్ను లిరిక్స్" : "VINNU LYRICS"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.75}
              onPress={handleLanguage}
              style={styles.languageButton}
            >
              <Text style={styles.languageButtonText}>
                {isTelugu ? "English" : "తెలుగు"}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Pressable>
    ),
    [isTelugu, handleLanguage, openLink]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        {isTelugu ? "యాప్ ప్రత్యేకతలు" : "Features in the App"}
      </Text>

      <FlatList
        data={DATA}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        directionalLockEnabled={true}
        bounces={true}
        alwaysBounceHorizontal={true}
        overScrollMode="always"
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        style={styles.horizontalList}
        contentContainerStyle={styles.listContent}
        initialNumToRender={4}
        windowSize={5}
      />

      <Text style={styles.scrollHint}>
        {isTelugu
          ? "కార్డుపై ఎక్కడైనా ఎడమకు లేదా కుడికి స్వైప్ చేయండి →"
          : "Swipe left or right anywhere on the cards →"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "stretch",
    paddingVertical: 1,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#17365D",
    marginHorizontal: 16,
    marginBottom: 12,
  },

  horizontalList: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 0,
  },

  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: "stretch",
  },

  card: {
    width: CARD_WIDTH,
    height: 240,
    marginHorizontal: 7,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#123B5D",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },

  gradient: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 10,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  numberBadge: {
    minWidth: 36,
    height: 27,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    color: "#FDE68A",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  headerAccent: {
    width: 35,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#FDE68A",
  },

  title: {
    color: "#FFE082",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23,
    marginBottom: 8,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 19,
    flexShrink: 1,
  },

  subscribeButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#E53935",
    borderRadius: 18,
  },

  subscribeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  cardFooter: {
    marginTop: "auto",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  footerLabel: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
    flexShrink: 1,
  },

  languageButton: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  languageButtonText: {
    color: "#164E63",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
  },

  scrollHint: {
    color: "#607080",
    fontSize: 12,
    marginTop: 7,
    marginHorizontal: 16,
  },
});