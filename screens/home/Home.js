import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

// Screens
import Account from "../account/Account";
import Dashboard from "../dashboard/Dashboard";

// Header
import Header from "../../components/Header";

const Home = () => {
    return (
        <>
        <Header />
        <Tab.Navigator>
            <Tab.Group screenOptions={{headerShown: false}}>
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Group>
        </Tab.Navigator>
        </>
    );
};

const HomeScreen = () => {

    return (
        <SafeAreaView>
            <Text>Hola</Text>
        </SafeAreaView>
    )
};

const theme = StyleSheet.create({
    centeredText: {
        textAlign: "center",
    },
});

export default Home;
