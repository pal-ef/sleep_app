import React from "react";
import { Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const App = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <Text style={theme.centeredText}>Hi please log in to the app</Text>
            <Button title="Go to App" color="red" onPress={() => navigation.navigate('Home')} />
        </SafeAreaView>
    );
};

const theme = StyleSheet.create({
    centeredText: {
        textAlign: "center",
        fontSize: 20,
    },
});

export default App;
