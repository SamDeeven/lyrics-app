import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../../reducers/darkModeReducer";


const Theme = () => {
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
    const dispatch = useDispatch();
    <View>
         <TouchableOpacity
        style={[styles.themeBtn, isDarkMode && styles.darkThemeBtn]}
        onPress={() => dispatch(toggleDarkMode())}
      >
        <Text
          style={[styles.themeBtnText, isDarkMode && styles.darkThemeBtnText]}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
    </View>

}

const styles = StyleSheet.create({
    themeBtn: {
        backgroundColor: "#CAD5E2",
        width: 130,
        padding: 5,
        marginTop:15,
        borderRadius: 10,
        alignSelf:"center"
      },
      themeBtnText: {
        color: "#120E43",
        fontSize: 20,
        textAlign: "center",
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
})

export default Theme;