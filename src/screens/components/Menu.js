import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Menu = ({navigation}) => {
  const handleAboutNavigation = () => {
    navigation.navigate('About')
    console.log("About Navigated")
  }
  const handleContactNavigation = () => {
    navigation.navigate('Contact')
    console.log("Contact Navigated")
  }
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={handleAboutNavigation}>
        <Text style={styles.menuItemText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={handleContactNavigation}>
        <Text style={styles.menuItemText}>Contact</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  menuContainer:{
    paddingVertical:100,
    paddingHorizontal:80,
  },
  menuItem:{
    borderWidth:2,
    marginBottom:15,
    borderTopLeftRadius:25,
    borderBottomRightRadius:25,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    padding:35,
  },
  menuItemText:{
    fontSize:35,
    lineHeight:50,
    textAlign:"center",
  }
});

export default Menu;