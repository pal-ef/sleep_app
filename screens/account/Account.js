import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native"; // Agregamos TextInput de react-native
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

const Account = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    let openImagePickerAsync = async () => {
        const permissionResult =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to camara roll is required");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        // console.log(pickerResult)

        if (pickerResult.canceled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.assets[0].uri });
    };

    const [isEditing, setIsEditing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username: "Usuario Ejemplo",
        firstName: "Nombre Ejemplo",
        lastName: "Apellido Ejemplo",
        email: "correo@ejemplo.com",
        phoneNumber: "1234567890",
    });

    // Funciones para manejar el botón de editar
    const handleEditPress = () => {
        setIsEditing(true);
    };

    // Función para manejar el botón de guardar
    const handleSavePress = () => {
        const hasEmptyField = Object.values(userInfo).some(
            (value) => value === ""
        );
        if (hasEmptyField) {
            setIsEmpty(true);
            Alert.alert("¡Verifique la información!");
            return;
        } else {
            setIsEmpty(false);
            setIsEditing(false);
            Alert.alert("Datos guardados exitosamente");
        }
    };

    // Función para manejar el cambio en los TextInput
    const handleChangeText = (key, value) => {
        setUserInfo({
            ...userInfo,
            [key]: value,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    {selectedImage !== null ? (
                        <Image
                            source={{ uri: selectedImage.localUri }}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    ) : (
                        <View style={styles.profileContainer}>
                            <Icon name="user" size={80} color="#4C8494" />
                        </View>
                    )}
                </TouchableOpacity>

                {isEditing ? (
                    // Mostrar TextInput para editar el nombre de usuario cuando se está editando
                    <TextInput
                        style={[
                            styles.input,
                            userInfo.username === "" &&
                                isEmpty &&
                                styles.inputError,
                        ]}
                        value={userInfo.username}
                        onChangeText={(value) =>
                            handleChangeText("username", value)
                        }
                        placeholder="Nombre de usuario"
                    />
                ) : (
                    <Text style={styles.usernameText}>{userInfo.username}</Text>
                )}
            </View>
            <View style={styles.userInfoContainer}>
                <View>
                    <Text style={styles.infoLabel}>Nombre</Text>
                    {isEditing ? (
                        // Mostrar TextInput para editar el nombre cuando se está editando
                        <TextInput
                            style={[
                                styles.input,
                                userInfo.firstName === "" &&
                                    isEmpty &&
                                    styles.inputError,
                            ]}
                            value={userInfo.firstName}
                            onChangeText={(value) =>
                                handleChangeText("firstName", value)
                            }
                        />
                    ) : (
                        <Text style={styles.infoText}>
                            {userInfo.firstName}
                        </Text>
                    )}
                    <Text style={styles.infoLabel}>Apellido</Text>
                    {isEditing ? (
                        // Mostrar TextInput para editar el apellido cuando se está editando
                        <TextInput
                            style={[
                                styles.input,
                                userInfo.lastName === "" &&
                                    isEmpty &&
                                    styles.inputError,
                            ]}
                            value={userInfo.lastName}
                            onChangeText={(value) =>
                                handleChangeText("lastName", value)
                            }
                        />
                    ) : (
                        <Text style={styles.infoText}>{userInfo.lastName}</Text>
                    )}
                    <Text style={styles.infoLabel}>Correo</Text>
                    <Text style={styles.infoText}>{userInfo.email}</Text>
                    <Text style={styles.infoLabel}>Número de Teléfono</Text>
                    {isEditing ? (
                        // Mostrar TextInput para editar el número de teléfono cuando se está editando
                        <TextInput
                            style={[
                                styles.input,
                                userInfo.phoneNumber === "" &&
                                    isEmpty &&
                                    styles.inputError,
                            ]}
                            value={userInfo.phoneNumber}
                            onChangeText={(value) =>
                                handleChangeText("phoneNumber", value)
                            }
                            keyboardType="phone-pad"
                        />
                    ) : (
                        <Text style={styles.infoText}>
                            {userInfo.phoneNumber}
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                {isEditing ? (
                    <TouchableOpacity
                        style={[styles.editInfoPressable, {backgroundColor: "#04A18F", borderWidth: 0}]}
                        onPress={handleSavePress}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 17,
                                fontWeight: "600",
                            }}
                        >
                            Guardar cambios
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.editInfoPressable}
                        onPress={handleEditPress}
                    >
                        <Text
                            style={{
                                color: "#1C93D6",
                                fontSize: 17,
                                fontWeight: "600",
                            }}
                        >
                            Cambiar información
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 16,
        width: "100%",
    },
    editInfoPressable: {
        display: "flex",
        backgroundColor: "#E9E9E9",
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D6D6D6",
    },
    profileContainer: {
        alignItems: "center",
        marginVertical: 16,
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: "black",
    },
    usernameText: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center",
    },
    userInfoContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 50,
        marginBottom: 60,
    },
    infoContainer: {
        marginBottom: 16,
    },
    infoLabel: {
        fontSize: 14,
        marginBottom: 4,
        color: "#B0AEAE",
    },
    infoText: {
        fontSize: 18,
        marginBottom: 18,
        
    },
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    inputError: {
        borderColor: "red",
    },
});

export default Account;
