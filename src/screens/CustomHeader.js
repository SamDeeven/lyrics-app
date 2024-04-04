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
          <Icon style={{marginTop:-7}} name="chevron-back-sharp" size={30} />
        </TouchableOpacity>
      ) : (
        <View style={styles.menuOption}>
          {showOptions ? (
            <View>
              <Icon
                onPress={() => handleOptions()}
                name="close-circle-sharp"
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Favorites");
                    setShowOptions(!showOptions);
                  }}
                  style={styles.menuItemsBtn}
                >
                  <Text style={styles.menuItemsBtnText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RecentlyViewed");
                    setShowOptions(!showOptions);
                  }}
                  style={styles.menuItemsBtn}
                >
                  <Text style={styles.menuItemsBtnText}>Recently Viewed</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <Icon onPress={() => handleOptions()} name="ellipsis-vertical-sharp" size={30} />
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
          <Icon style={{marginTop:-15}} name="home-sharp" size={30} />
        </TouchableOpacity>
      )}
      {homeStyle && (
        <View>

      <Text style={{fontWeight:"900"}}>Total Songs</Text>
      <Text style={{textAlign:"center", fontWeight:"900"}}>{totalObjects}</Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#02B290",
    height: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 15,
  },
  homeHeaderContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#02B290",
    height: 42,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 27,
    fontFamily: "Poppins_800ExtraBold",
    color: "black",
    marginTop:-7
    // flex:1.6
  },
  homeHeader: {
    fontSize: 27,
    fontFamily: "Poppins_800ExtraBold",
    alignItems: "center",
    justifyContent: "center",
    flex: 1.1,
    marginTop:-7
  },
  menuOption: {
    flex: 1,
    marginTop:-7

  },
  menuContainer: {
    backgroundColor: "#ECF0F1",
    borderWidth:1,
    borderColor:"#53E0BC",
    width: 250,
    position: "absolute",
    left: 0,
    top: 48,
    height: 290,
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
    backgroundColor: "#53E0BC",
    // borderRadius: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  menuItemsBtnText: {
    fontSize: 25,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});

export default CustomHeader;
