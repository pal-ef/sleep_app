import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
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

// Simulated data

//const [usedData, setUsedData] = useState([]);
/*
//          0        1         2
sleepdata = [[good], [bad], [regular]]
useEffect(() => {
    // uso de datos
    setTimeout(() => {
        indice++;
        setUsedData(sleepdata[indice]);
        if(indice > sleepdata.length) indice = 0;
    }, 30000);
}, []);
*/

const HomeScreen = () => {
    // States for alarm
    const [hour, setHour] = useState(9);

    const handleHourUp = () => {
        let newHour = hour + 1;
        if (newHour > 12) {
            setHour(1);
        } else {
            setHour(newHour);
        }
    };

    const handleHourDown = () => {
        let newHour = hour - 1;
        if (newHour < 1) {
            setHour(12);
        } else {
            setHour(newHour);
        }
    };
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
            <Text style={theme.textTitle}>Me gustaría despertar...</Text>
            <View style={theme.setAlarm}>
                {/* Arrows */}
                <View style={theme.setAlarmArrows}>
                    <TouchableOpacity onPress={handleHourUp}>
                        <Ionicons
                            style={{ marginTop: 7, marginBottom: -15 }}
                            name="chevron-up-outline"
                            size={36}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleHourDown}>
                        <Ionicons
                            name="chevron-down-outline"
                            size={36}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                {/* Big number */}
                <View style={theme.setAlarmNumber}>
                    <Text style={{ fontSize: 80, fontWeight: "500" }}>
                        {hour}
                    </Text>
                </View>
                {/* Meridiem */}
                <View style={theme.setAlarmNumber}>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>AM</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>PM</Text>
                </View>
            </View>
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
    setAlarm: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
});

export default Home;
