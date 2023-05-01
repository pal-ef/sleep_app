import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 

const Header = () => {
    return (
        <View style={theme.container}>
            <FontAwesome name="heartbeat" size={24} color="#005C71" />
            <Text style={theme.logoText}>DreamWell</Text>
            <Ionicons style={{marginLeft: "auto"}} name="watch-outline" size={24} color="#005C71" />
        </View>
    );
};

const theme = StyleSheet.create({
    container: {
        marginTop: 35,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },  
    logoText: {
        fontSize: 20,
        color: "#005C71"
    },
});

export default Header;
