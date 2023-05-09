import React, { useState } from "react";
import { Text, StyleSheet, Pressable, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const App = () => {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({});

    const verifyUserCredentials = async () => {
        const response = await fetch('https://sleepapp-backend-production.up.railway.app/user/credentials', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(credentials), // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(json.id) {
            navigation.navigate('Home', { credentials: json });
        } else {
            Alert.alert('Credenciales inválidas', 'Intentalo de nuevo');
        }
    };

    return (
        <SafeAreaView
            style={{
                paddingVertical: 100,
                display: "flex",
                alignItems: "center",
            }}
        >
            <View style={theme.logo}>
                <FontAwesome name="heartbeat" size={84} color="#005C71" />
                <Text style={{ fontSize: 26, color: "#005C71" }}>
                    DreamWell
                </Text>
            </View>
            <Text style={theme.centeredText}>Inicio de sesión</Text>

            <View style={theme.inputContainer}>
                <Text>Nombre de usuario</Text>
                <TextInput
                    onChangeText={(text) =>
                        setCredentials({ ...credentials, username: text })
                    }
                    style={theme.input}
                    placeholder="Ingresa tu nombre de usuario aquí"
                />
            </View>
            <View style={theme.inputContainer}>
                <Text>Contraseña</Text>
                <TextInput
                    onChangeText={(text) =>
                        setCredentials({ ...credentials, password: text })
                    }
                    secureTextEntry={true}
                    style={theme.input}
                    placeholder="Ingresa tu contraseña aquí"
                />
            </View>
            <Pressable style={theme.newAccount} onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: "blue"}}>¿No tienes cuenta? Registrate aquí</Text>
            </Pressable>

            <Pressable
                style={theme.accessButton}
                onPress={() => verifyUserCredentials()}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 18,
                    }}
                >
                    Acceder
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

const theme = StyleSheet.create({
    centeredText: {
        marginTop: 60,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 20,
    },
    logo: {
        display: "flex",
        alignItems: "center",
    },
    inputContainer: {
        paddingHorizontal: 30,
        marginTop: 20,
        minWidth: 390,
    },
    input: {
        backgroundColor: "#CCDEE3",
        color: "black",
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    accessButton: {
        marginTop: 40,
        backgroundColor: "#4C8494",
        paddingVertical: 12,
        width: 160,
    },
    newAccount: {
        marginTop: 20,
    }
});

export default App;
