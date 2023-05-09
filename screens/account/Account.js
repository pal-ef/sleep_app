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

const Account = (props) => {
    const [waifuURL, setWaifuURL] = useState("google.com");
    const [dominantColor, setDominantColor] = useState("gray");
    //const [userData, setUserData] = useState("");
    const [userInfo, setUserInfo] = useState(props.credentials);
    // Fetcher
    const fetchWaifu = async () => {
        setWaifuURL(
            "https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif"
        );
        const response = await fetch("https://api.waifu.im/search/");
        const jsonData = await response.json();
        setDominantColor(jsonData.images[0].dominant_color);
        setTimeout(() => {
            setWaifuURL(jsonData.images[0].url);
        }, 300);
        //console.log(jsonData.images[0].url);
    };

    // Not necessary anymore
    /*
    const fetchUserData = async() => {
        const response = await fetch('https://sleepapp-backend-production.up.railway.app/user/1');
        const jsonData = await response.json();
        setUserInfo(jsonData);
    }
    */


    useEffect(() => {
        fetchWaifu();
        //fetchUserData();
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
    

    async function updateUserInfo(data) {
        console.log(data);
        // Default options are marked with *
        const response = await fetch(`https://sleepapp-backend-production.up.railway.app/user/${props.credentials.id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }

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
                //Alert.alert("Datos guardados exitosamente");
                // Guardar datos
                const response = updateUserInfo(userInfo);
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
                                style={[styles.image, {borderColor: dominantColor}]}
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
                    value={'@'+userInfo.username}
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
                            value={userInfo.name}
                            
                            onChangeText={(value) =>
                                handleChangeText("name", value)
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
                            value={JSON.stringify(userInfo.phone)}
                            keyboardType={"numeric"}
                            onChangeText={(value) =>
                                handleChangeText("phone", parseInt(value))
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
        borderWidth: 2,
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
