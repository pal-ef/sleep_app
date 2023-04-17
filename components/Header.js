import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
    return (
        <View style={theme.container}>
            <Text style={theme.logoText}>DreamWell</Text>
        </View>
    );
};

const theme = StyleSheet.create({
    container: {
        marginTop: 35,
        paddingHorizontal: 20,
    },  
    logoText: {
        fontSize: 20,
    },
});

export default Header;
