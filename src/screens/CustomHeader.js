import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomHeader = ({ title, showBackButton, showHomeButton, homeStyle }) => {
  const [showOptions, setShowOptions] = useState(false);
  const route = useRoute();

  const navigation = useNavigation();
  const handleOptions = () => {
    setShowOptions(!showOptions);
  };


  console.log("Loaded Header=>");
  return (
<View
    style={homeStyle ? styles.homeHeaderContainer : styles.headerContainer}
  >
    {showBackButton ? (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon style={{}} name="chevron-back-sharp" size={30} />
      </TouchableOpacity>
    ) : (
      <View style={styles.menuOption}>
        {showOptions ? (
          <View>
            <Icon
              onPress={() => handleOptions()}
              name="close-sharp"
              size={40}
            />
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={styles.menuItemsBtn}
                onPress={() => {
                  navigation.navigate("Contact");
                  setShowOptions(!showOptions);
                }}
              >
                <Text style={styles.menuItemsBtnText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("About");
                  setShowOptions(!showOptions);
                }}
                style={styles.menuItemsBtn}
              >
                <Text style={styles.menuItemsBtnText}>About</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Icon onPress={() => handleOptions()} name="menu-sharp" size={40} />
        )}
      </View>
    )}
    <Text style={homeStyle ? styles.homeHeader : styles.headerTitle}>
      {title}
    </Text>
    {showHomeButton && (
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.homeButton}
      >
        <Icon style={{}} name="home-sharp" size={30} />
      </TouchableOpacity>
    )}
  </View>  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#02B290",
    height: 70,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius:35,
   paddingHorizontal:15
  },
  homeHeaderContainer: {
    alignItems:"center",
    flexDirection: "row",
    backgroundColor: "#02B290",
    height: 70,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 27,
    fontFamily: "Poppins_800ExtraBold",
    color: "black",
    // flex:1.6
  },
  homeHeader: {
    fontSize: 27,
    fontFamily: "Poppins_800ExtraBold",
    alignItems: "center",
    justifyContent:"center",
    flex: 1.5,

  },
  menuOption:{
flex:1
  },
  menuContainer: {
    backgroundColor: "#ECF0F1",
    width: 300,
    position: "absolute",
    left: 0,
    top: 45,
    height: 150,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  menuItemsBtn: {
    margin: 6,
    paddingVertical: 5,
    backgroundColor: "#53E0BC",
    borderRadius: 10,
  },
  menuItemsBtnText: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});

export default CustomHeader;