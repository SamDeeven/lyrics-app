import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomHeader = ({ title, showBackButton, showHomeButton, homeStyle, totalObjects }) => {
  const [showOptions, setShowOptions] = useState(false);

  const navigation = useNavigation();
  const handleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <View
      style={homeStyle ? styles.homeHeaderContainer : styles.headerContainer}
    >
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon style={{marginTop:-7}} name="chevron-back-sharp" size={22} color={"white"}/>
        </TouchableOpacity>
      ) : (
        <View style={styles.menuOption}>
          {showOptions ? (
            <View>
              <Icon
                onPress={() => handleOptions()}
                name="close-circle-sharp"
                size={22}
                color={"white"}
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

                <View
                  onPress={() => {
                    navigation.navigate("About");
                    setShowOptions(!showOptions);
                  }}
                  style={styles.menuItemsBtn}
                >
                  <Text style={styles.menuItemsBtnText}>Total Songs in the app: {totalObjects}</Text>
                </View>
                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Favorites");
                    setShowOptions(!showOptions);
                  }}
                  style={styles.menuItemsBtn}
                >
                  <Text style={styles.menuItemsBtnText}>Favorites</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RecentlyViewed");
                    setShowOptions(!showOptions);
                  }}
                  style={styles.menuItemsBtn}
                >
                  <Text style={styles.menuItemsBtnText}>Recently Viewed</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          ) : (
            <Icon onPress={() => handleOptions()} name="ellipsis-vertical-sharp" size={22} color={"white"}/>
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
          <Icon style={{marginTop:-15}} name="home-sharp" size={22} color={"white"}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#273A6F",
    height: 33,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 15,
  },
  homeHeaderContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#273A6F",
    height: 33,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_800ExtraBold",
    color: "white",
    marginTop:-7
    // flex:1.6
  },
  homeHeader: {
    fontSize: 18,
    fontFamily: "Poppins_800ExtraBold",
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    flex: 1.3,
    marginTop:-7
  },
  menuOption: {
    flex: 1,
    marginTop:-7

  },
  menuContainer: {
    backgroundColor: "#cAEAEa",
    // borderWidth:1,
    // borderColor:"#303b7c",
    width: 230,
    position: "absolute",
    left: 0,
    top: 38,
    height: 250,
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
  menuItemsBtn: {
    margin: 6,
    marginTop: 15,
    paddingVertical: 5,
    backgroundColor: "#1679AB",
    // borderRadius: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  menuItemsBtnText: {
    fontSize: 25,
    color:"white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});

export default CustomHeader;
