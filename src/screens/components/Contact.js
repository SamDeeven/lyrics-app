import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

const Contact = () => {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22,textAlign:"justify", paddingHorizontal:15, marginTop:15 }}>
        If you find any mistakes in the lyrics or if you need any song lyrics in
        this app, kindly mail us
      </Text>
      <View>
      <Icon style={{position:"absolute"}} name="mail-sharp" size={30} />
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:samdeeven.lyricsapp@gmail.com")}
        style={{ borderWidth: 1.5, borderRadius:18, alignContent:"center", marginHorizontal:30 }}
      >
        <Text style={{fontSize: 18, textAlign:"center"}}>samdeeven.lyricsapp@gmail.com</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Contact;
