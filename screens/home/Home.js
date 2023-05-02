import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

// Screens
import Account from "../account/Account";
import Dashboard from "../dashboard/Dashboard";

// Header
import Header from "../../components/Header";

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

const Home = () => {
    return (
        <>
            <Header />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "HomeScreen") {
                            iconName = focused
                                ? "ios-home"
                                : "ios-home-outline";
                        } else if (route.name === "Dashboard") {
                            iconName = focused ? "grid" : "grid-outline";
                        } else {
                            iconName = focused
                                ? "person-circle"
                                : "person-circle-outline";
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#005C71",
                    tabBarInactiveTintColor: "gray",
                    tabBarShowLabel: false,
                })}
            >
                <Tab.Group screenOptions={{ headerShown: false }}>
                    <Tab.Screen name="HomeScreen" component={HomeScreen} />
                    <Tab.Screen name="Dashboard" component={Dashboard} />
                    <Tab.Screen name="Account" component={Account} />
                </Tab.Group>
            </Tab.Navigator>
        </>
    );
};

// 3 ciclos con datos aleatorios
// Simular 1 min
// 60-80 BPM == despierto
// 40-60 BPM == sueño ligero
// 30-40 BPM == sueño profundo
// 10-20 BPM == casi muerto

// Ciclos = horas_dormidas / 90 minutos

// Simular la entrada de datos en tiempo real

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <Text style={theme.textTitle}>Información de la última noche</Text>
            <View style={theme.contentContainer}>
                <View
                    style={[theme.opacity, { height: getRandomInt(10, 250) }]}
                ></View>
                <View style={theme.colorBar}>
                    <View style={theme.colorBarBlue}></View>
                    <View style={theme.colorBarGreen}></View>
                    <View style={theme.colorBarYellow}></View>
                    <View style={theme.colorBarRed}></View>
                </View>
                <View style={theme.dataBoxContainer}>
                    <View style={theme.dataBox}>
                        <Text style={{ fontSize: 60, textAlign: "center" }}>
                            {Math.round(getRandomInt(0, 5))}
                        </Text>
                        <Text>Ciclos de sueño</Text>
                    </View>
                    <View style={theme.dataBox}>
                        <Text style={{ fontSize: 60, textAlign: "center" }}>
                            {Math.round(getRandomInt(0, 8))}.
                            {Math.round(getRandomInt(1, 9))}
                        </Text>
                        <Text>Horas de sueño</Text>
                    </View>
                    <View style={theme.dataBox}>
                        <Text style={{ fontSize: 60, textAlign: "center" }}>
                            {Math.round(getRandomInt(0, 9))}x
                        </Text>
                        <Text>Te despertaste</Text>
                    </View>
                    <View style={theme.dataBox}>
                        <Text style={{ fontSize: 60, textAlign: "center" }}>
                            {Math.round(getRandomInt(1, 99))}%
                        </Text>
                        <Text>Calidad de sueño</Text>
                    </View>
                </View>
            </View>
            <Text style={theme.textTitle}>¿Qué significa esto?</Text>
        </SafeAreaView>
    );
};

const theme = StyleSheet.create({
    textTitle: {
        marginVertical: 10,
        color: "#3A3A3A",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "600",
    },
    contentContainer: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        gap: 50,
    },
    centeredText: {
        textAlign: "center",
    },
    colorBar: {
        width: 25,
    },
    colorBarRed: {
        backgroundColor: "#E85B5B",
        width: 25,
        height: 40,
    },
    colorBarBlue: {
        backgroundColor: "#21ABF9",
        width: 25,
        height: 40,
    },
    colorBarGreen: {
        backgroundColor: "#39AE53",
        width: 25,
        height: 85,
    },
    colorBarYellow: {
        backgroundColor: "#FAC131",
        width: 25,
        height: 85,
    },
    opacity: {
        position: "absolute",
        left: 20,
        top: 20,
        zIndex: 1000,
        backgroundColor: "white",
        opacity: 0.7,
        width: 25,
        height: 200,
    },
    dataBoxContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 45,
        gap: 60,
    },
    dataBox: {},
});

export default Home;
