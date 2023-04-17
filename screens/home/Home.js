import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text style={theme.centeredText}>Welcome to home</Text>
        </SafeAreaView>
    );
};

const theme = StyleSheet.create({
    centeredText: {
        textAlign: "center",
    },
});

export default Home;
