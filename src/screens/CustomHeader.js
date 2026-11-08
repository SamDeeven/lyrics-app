import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "../utils/AppIcons";

const HEADER_HEIGHT = 56;

const MENU_ITEMS = [
  { icon: "mail-outline", label: "Contact", screen: "Contact" },
  { icon: "information-circle-outline", label: "About", screen: "About" },
];

const HeaderButton = ({ icon, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={styles.iconButton}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Icon name={icon} size={22} color="#FFFFFF" />
  </TouchableOpacity>
);

const CustomHeader = ({
  title,
  subtitle,
  showBackButton,
  showHomeButton,
  homeStyle,
  totalObjects,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // The menu opens in a Modal (a separate layer), so it sits below the header
  // and every item is tappable on Android.
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 50;

  const closeMenu = () => setMenuVisible(false);

  const goTo = (screen) => {
    closeMenu();
    navigation.navigate(screen);
  };

  return (
    <>
      <View
        // colors={["#2C3E50", "#1679AB"]}
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Left: back button, or the menu button on the main screen */}
        {showBackButton ? (
          <HeaderButton
            icon="chevron-back-sharp"
            label="Go back"
            onPress={() => navigation.goBack()}
          />
        ) : (
          <HeaderButton
            icon="ellipsis-vertical-sharp"
            label="Open menu"
            onPress={() => setMenuVisible(true)}
          />
        )}

        {/* Center: title (and optional subtitle) */}
        <View style={[styles.titleWrap, homeStyle && styles.titleWrapHome]}>
          <Text
            numberOfLines={1}
            style={[styles.title, homeStyle && styles.titleHome]}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text numberOfLines={1} style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* Right: home button (or an empty box so the title stays centered) */}
        {showHomeButton ? (
          <HeaderButton
            icon="home-sharp"
            label="Go to home"
            onPress={() => navigation.navigate("Home")}
          />
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.backdrop} onPress={closeMenu}>
          <Pressable
            style={[styles.menuCard, { top: statusBarHeight + HEADER_HEIGHT + 8 }]}
            onPress={() => {}}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>MENU</Text>
              <TouchableOpacity
                onPress={closeMenu}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel="Close menu"
              >
                <Icon name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.screen}
                activeOpacity={0.6}
                style={styles.menuItem}
                onPress={() => goTo(item.screen)}
              >
                <View style={styles.menuIconWrap}>
                  <Icon name={item.icon} size={20} color="#1679AB" />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Icon
                  name="chevron-back-sharp"
                  size={18}
                  color="#8A99A8"
                  style={styles.menuArrow}
                />
              </TouchableOpacity>
            ))}

            {totalObjects != null && (
              <View style={styles.totalRow}>
                <View style={styles.menuIconWrap}>
                  <Icon name="musical-notes" size={20} color="#1679AB" />
                </View>
                <Text style={styles.totalText}>
                  Total songs in the app:{" "}
                  <Text style={styles.totalNumber}>{totalObjects}</Text>
                </Text>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: HEADER_HEIGHT,
    paddingHorizontal: 12,
    backgroundColor: "#2C3E50",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: 40,
    height: 40,
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  titleWrapHome: {
    alignItems: "flex-start",
    paddingLeft: 12,
    alignItems: "center"
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
    
  },
  titleHome: {
    fontSize: 20,
  },
  subtitle: {
    color: "#CFE5F7",
    fontSize: 11,
    marginTop: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(10, 18, 32, 0.35)",
  },
  menuCard: {
    position: "absolute",
    left: 12,
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D5E2EC",
    overflow: "hidden",
    elevation: 10,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#2C3E50",
  },
  menuHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#DDE6EE",
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  menuArrow: {
    transform: [{ rotate: "180deg" }],
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F4F9FD",
  },
  totalText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#728198",
  },
  totalNumber: {
    fontWeight: "700",
    color: "#2C3E50",
  },
});

export default CustomHeader;