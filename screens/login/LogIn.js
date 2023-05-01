import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

const App = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{paddingVertical: 100, display: "flex", alignItems:"center"}}>
            <View style={theme.logo}>
                <FontAwesome name="heartbeat" size={64} color="#005C71" />
                <Text style={{fontSize: 26, color: "#005C71"}}>DreamWell</Text>
            </View>
            <Text style={theme.centeredText}>Inicio de sesión</Text>

            <View style={theme.inputContainer}>
                <Text>Nombre de usuario o correo electronico</Text>
                <TextInput style={theme.input} placeholder="Correo electronico o nombre de usuario"/>
            </View>
            <View style={theme.inputContainer}>
                <Text>Contraseña</Text>
                <TextInput style={theme.input} placeholder="Ingresa tu contraseña"/>
            </View>
            
            <Pressable
                style={theme.accessButton}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={{textAlign: "center", color: "white", fontSize: 18}}>Acceder</Text>
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
        alignItems: "center"
    },
    inputContainer: {
        paddingHorizontal: 30,
        marginTop: 20,
        minWidth: 390
    },
    input: {
        backgroundColor: "#CCDEE3",
        color: "white",
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    accessButton: {
        marginTop: 60,
        backgroundColor: "#4C8494",
        paddingVertical: 12,
        width: 160,
    }
});

export default App;
