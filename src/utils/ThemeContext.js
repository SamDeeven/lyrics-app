import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

// AsyncStorage key that remembers the last chosen mode ("light" or "dark")
const THEME_STORAGE_KEY = "themeMode";

export const lightColors = {
  background: "#F2F2F2", // same as the current default screen background
  card: "#FFFFFF",
  surfaceAlt: "#F4F9FD",
  accentSoft: "#E3F2FD",
  text: "#2C3E50",
  textMuted: "#728198",
  heading: "#17365D",
  brownText: "brown",
  accent: "#1679AB",
  primary: "#2C3E50", // dark slate buttons / headers
  border: "#2C3E50",
  borderSoft: "#D5E2EC",
  headerGradient: ["#2C3E50", "#1679AB"],
  headerSolid: "#2C3E50",
};

export const darkColors = {
  background: "#0F1720",
  card: "#1A2633",
  surfaceAlt: "#223244",
  accentSoft: "#1F3A52",
  text: "#E6EDF5",
  textMuted: "#9FB1C5",
  heading: "#CFE5F7",
  brownText: "#E3A98C",
  accent: "#5BB4E5",
  primary: "#2E5A82",
  border: "#56718B",
  borderSoft: "#2E4256",
  headerGradient: ["#0B1219", "#17425F"],
  headerSolid: "#0B1219",
};

const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
  navigationTheme: DefaultTheme,
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Load the saved choice once, when the app starts
  useEffect(() => {
    let isActive = true;

    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (isActive && savedMode === "dark") {
          setIsDark(true);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        if (isActive) {
          setIsReady(true);
        }
      }
    };

    loadTheme();

    return () => {
      isActive = false;
    };
  }, []);

  // Save the choice every time it changes (after the first load)
  useEffect(() => {
    if (!isReady) return;

    AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light").catch(
      (error) => console.error("Error saving theme:", error)
    );
  }, [isDark, isReady]);

  const toggleTheme = useCallback(() => {
    setIsDark((previous) => !previous);
  }, []);

  const value = useMemo(() => {
    const colors = isDark ? darkColors : lightColors;
    const baseTheme = isDark ? DarkTheme : DefaultTheme;

    return {
      isDark,
      colors,
      toggleTheme,
      // Pass this to <NavigationContainer theme={...}> so every screen's
      // background follows the mode too.
      navigationTheme: {
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          background: colors.background,
          card: colors.headerSolid,
          text: colors.text,
          border: colors.borderSoft,
          primary: colors.accent,
        },
      },
    };
  }, [isDark, toggleTheme]);

  // Wait for the saved choice so the app never flashes the wrong mode
  if (!isReady) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => useContext(ThemeContext);