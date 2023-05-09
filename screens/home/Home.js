import React, { useEffect, useState, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

// Screens
import Account from "../account/Account";
import Dashboard from "../dashboard/Dashboard";

// Header
import Header from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

const HomeScreen = (props) => {
    console.log(props.credentials);
    // States for alarm
    const [hour, setHour] = useState(9);

    //Notificaciones alv ---------------

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Despierta dormilón UwU",
                body: "Tu leche esta lista",
            },
            trigger: { seconds: 2 }
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);

        return token;
    }

    //----------------------------------

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
        <ScrollView>
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
            <View style={{ alignItems: "center", marginVertical: 15 }}>
                <TouchableOpacity
                    style={theme.setAlarmButton}
                    onPress={async () => {
                        await schedulePushNotification();
                    }}
                >
                    <Text
                        style={{
                            color: "#1C93D6",
                            fontSize: 14,
                            fontWeight: "600",
                        }}
                    >
                        Definir hora
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 15 }}>
                <View>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            fontWeight: "600",
                            marginVertical: 10,
                        }}
                    >
                        Tips para mejorar tu sueño
                    </Text>
                    <Image
                        style={theme.image}
                        source={{
                            uri: "https://i.pinimg.com/600x315/45/75/c0/4575c04dff98ecf1a773bbcf4c4d9498.jpg",
                        }}
                    />
                </View>
                <View style={theme.containerTip}>
                    <View style={theme.listItem}>
                        <Text style={theme.textTip}>
                            1 - Establece una rutina de sueño: trata de
                            acostarte y levantarte a la misma hora todos los
                            días, incluso los fines de semana. Esto ayuda a tu
                            cuerpo a establecer un ritmo circadiano regular y a
                            prepararse para el sueño.
                        </Text>
                    </View>
                    <View style={theme.listItem}>
                        <Text style={theme.textTip}>
                            2 - Crea un ambiente propicio para el sueño: tu
                            habitación debe ser fresca, oscura y silenciosa.
                            Asegúrate de que tu cama y almohadas sean cómodas.
                            Evita ver televisión o utilizar dispositivos
                            electrónicos antes de dormir, ya que la luz azul que
                            emiten puede afectar tu ritmo circadiano.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const Home = ({ route }) => {
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
                    <Tab.Screen
                        name="HomeScreen"
                        children={() => (
                            <HomeScreen
                                credentials={route.params.credentials}
                            />
                        )}
                    />
                    <Tab.Screen
                        name="Dashboard"
                        children={() => (
                            <Dashboard credentials={route.params.credentials} />
                        )}
                    />
                    <Tab.Screen
                        name="Account"
                        children={() => (
                            <Account credentials={route.params.credentials} />
                        )}
                    />
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
    setAlarm: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    setAlarmButton: {
        display: "flex",
        backgroundColor: "#E9E9E9",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#D6D6D6",
    },
    textTip: {
        marginVertical: 10,
        color: "#3A3A3A",
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 20,
    },
    containerTip: {
        flex: 1,
        padding: 10,
        marginHorizontal: 20,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        marginHorizontal: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#0C859F",
    },
});

export default Home;
