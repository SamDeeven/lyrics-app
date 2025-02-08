import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";


export default function Categories() {
    const navigation = useNavigation();

    const navigateToCategories = () => {
        navigation.navigate("Categories");
    }
  return (
    <View>
      <Text>Categories</Text>

      <TouchableOpacity style={styles.categoryButton} onPress={navigateToCategories}>
        <Text style={styles.catBtnText}>Worship</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor:"orange",
        width:100,
        height:30,
        borderRadius:10

    },
    catBtnText: {
        textAlign:"center",
        fontSize:20
    }

})