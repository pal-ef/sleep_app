import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native"; // Agregamos TextInput de react-native
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";

const Account = () => {
    const [waifuURL, setWaifuURL] = useState("");
    // Fetcher
    const fetchWaifu = async () => {
        setWaifuURL(
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif"
        );
        const response = await fetch("https://api.waifu.im/search/");
        const jsonData = await response.json();
        setTimeout(() => {
            setWaifuURL(jsonData.images[0].url);
        }, 1500);
        //console.log(jsonData.images[0].url);
    };

    useEffect(() => {
        fetchWaifu();
    }, []);

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
        username: "derek_williams",
        fullName: "William Shakespere",
        email: "correo@ejemplo.com",
        phoneNumber: "+81 197515773",
    });

    // Funciones para manejar el botón de editar
    const handleEditButton = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            const hasEmptyField = Object.values(userInfo).some(
                (value) => value === ""
            );
            if (hasEmptyField) {
                setIsEmpty(true);
                Alert.alert("Por favor, revisa que ningún campo este vacío");
                return;
            } else {
                setIsEmpty(false);
                setIsEditing(false);
                //Alert.alert("Datos guardados exitosamente");
            }
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
                            <Image
                                source={{ uri: waifuURL }}
                                resizeMode="contain"
                                style={styles.image}
                            />
                        </View>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={[
                        styles.usernameText,
                        isEditing ? styles.editingMode : null
                    ]}
                    editable={isEditing ? true : false}
                    value={userInfo.username}
                    onChangeText={(value) =>
                        handleChangeText("username", value)
                    }
                    placeholder="Nombre de usuario"
                />
            </View>
            <View style={styles.userInfoContainer}>
                <View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIcon}>
                            <Feather name="at-sign" size={20} color="white" />
                        </View>
                        <TextInput
                            editable={isEditing ? true : false}
                            style={[styles.input, isEditing ? styles.editingMode : null]}
                            value={userInfo.email}
                            onChangeText={(value) =>
                                handleChangeText("email", value)
                            }
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIcon}>
                            <Feather name="user" size={20} color="white" />
                        </View>
                        <TextInput
                            editable={isEditing ? true : false}
                            style={[styles.input, isEditing ? styles.editingMode : null]}
                            value={userInfo.fullName}
                            onChangeText={(value) =>
                                handleChangeText("fullName", value)
                            }
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputIcon}>
                            <Feather name="phone" size={20} color="white" />
                        </View>
                        <TextInput
                            editable={isEditing ? true : false}
                            style={[styles.input, isEditing ? styles.editingMode : null]}
                            value={userInfo.phoneNumber}
                            onChangeText={(value) =>
                                handleChangeText("phoneNumber", value)
                            }
                        />
                    </View>
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    style={[styles.editInfoPressable, isEditing ? {backgroundColor: "#35B48E", borderColor: "#35B48E"}: null]}
                    onPress={handleEditButton}
                >
                    <Text
                        style={
                            isEditing
                                ? {
                                      color: "white",
                                      fontSize: 17,
                                      fontWeight: "600",
                                  }
                                : {
                                      color: "#1C93D6",
                                      fontSize: 17,
                                      fontWeight: "600",
                                  }
                        }
                    >
                        {isEditing ? "Guardar cambios" : "Cambiar información"}
                    </Text>
                </TouchableOpacity>
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
        marginVertical: 8,
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 8,
        borderWidth: 1.3,
        borderColor:"#0C859F"
    },
    usernameText: {
        width: "auto",
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 8,
        paddingHorizontal: 15,
        paddingVertical: 3,
        textAlign: "center",
        borderRadius: 6,
    },
    userInfoContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: 50,
        marginBottom: 30,
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
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
        backgroundColor: "#E1E9EB",
        padding: 6.5,
        paddingLeft: 12,
        width: "85%",
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        color: "#3A3A3A",
    },
    inputError: {
        borderColor: "red",
    },
    inputIcon: {
        backgroundColor: "#0C859F",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    editingMode: {
        borderWidth: 1,
        borderColor: "#0C859F",
        paddingVertical: 5.5
    }
});

export default Account;
