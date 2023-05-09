import React, { useState } from "react";
import { Text, StyleSheet, Pressable, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const SignUp = () => {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({});

    const verifyUserCredentials = async () => {
        
        // Validate credentials
        const {username, name, phone, email, password} = credentials;
        if(
            username.length < 1 ||
            name.length < 1 ||
            phone.length < 1 ||
            email.length < 1 ||
            password.length < 1
        ) {
            Alert.alert('Rellena la información solicitada');
            return;
        }


        const response = await fetch(
            "https://sleepapp-backend-production.up.railway.app/user/",
            {
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
            }
        );

        const json = await response.json(); // parses JSON response into native JavaScript objects
        if(json.message == "Account was created successfully") {
            Alert.alert(
                'Cuenta creada',
                'Ahora inicia sesión para acceder',
                [
                  {
                    text: 'Iniciar sesión',
                    onPress: () => navigation.navigate('LogIn'),
                    style: 'confirm',
                  },
                ],
                {
                  cancelable: false
                }
            );
        } else {
            Alert.alert('Un error ocurrio al crear tu cuenta.')
        }
    };

    return (
        <ScrollView
            style={{ marginTop: 80 }}
        >
            <View style={{display: "flex", alignItems: "center"}}>
                <View style={theme.logo}>
                    <FontAwesome name="heartbeat" size={84} color="#005C71" />
                    <Text style={{ fontSize: 26, color: "#005C71" }}>
                        DreamWell
                    </Text>
                </View>
                <Text style={theme.centeredText}>Registro de nueva cuenta</Text>

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
                    <Text>Nombre completo</Text>
                    <TextInput
                        onChangeText={(text) =>
                            setCredentials({ ...credentials, name: text })
                        }
                        style={theme.input}
                        placeholder="Ingresa tu nombre completo aquí"
                    />
                </View>
                <View style={theme.inputContainer}>
                    <Text>Número de telefono</Text>
                    <TextInput
                        onChangeText={(text) =>
                            setCredentials({
                                ...credentials,
                                phone: parseInt(text),
                            })
                        }
                        keyboardType={"numeric"}
                        style={theme.input}
                        placeholder="Ingresa tu número aquí"
                    />
                </View>
                <View style={theme.inputContainer}>
                    <Text>Correo electronico</Text>
                    <TextInput
                        onChangeText={(text) =>
                            setCredentials({ ...credentials, email: text })
                        }
                        style={theme.input}
                        placeholder="Ingresa tu correo aquí"
                    />
                </View>
                <View style={theme.inputContainer}>
                    <Text>Contraseña</Text>
                    <TextInput
                        onChangeText={(text) =>
                            setCredentials({ ...credentials, password: text })
                        }
                        style={theme.input}
                        placeholder="Ingresa tu contraseña aquí"
                    />
                </View>

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
                        Registrarse
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const theme = StyleSheet.create({
    centeredText: {
        marginTop: 30,
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
        marginTop: 15,
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
    },
});

export default SignUp;
