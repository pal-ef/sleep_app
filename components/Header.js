import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
    const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
    const [iconName, setIconName] = useState("watch-outline");
    const [iconColor, setIconColor] = useState("gray");
    const [BPM, setBPM] = useState(0);

    const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
    const [iconPressed, setIconPressed] = useState(false);

    const spin = spinAnim.interpolate({
        inputRange: [0, 0.25, 0.5, 1],
        outputRange: ["0deg", "90deg", "-30deg", "0deg"],
    });

    function rotate() {
        Animated.spring(spinAnim, {
            toValue: iconPressed ? 0 : 1,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    }

    const pairingBand = () => {
        if (iconName == "watch-sharp") {
            setTimeout(() => {
                setIconName("watch-outline");
                setIconColor("gray");
                rotate();
            }, 500);
        } else {
            setIconName("ellipsis-horizontal-outline");
            setTimeout(() => {
                setIconName("watch-sharp");
                setIconColor("#005C71");
                rotate();
            }, 2000);
        }
    };

    function getBPM(min, max) {
        return Math.random() * (max - min) + min;
    }

    setTimeout(() => {
        setBPM(Math.round(getBPM(40,50)));
    }, 3000);

    return (
        <View style={theme.container}>
            <FontAwesome name="heartbeat" size={24} color="#005C71" />
            <Text style={theme.logoText}>DreamWell</Text>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    marginLeft: "auto",
                    alignItems: "center",
                }}
            >
                {iconName == "watch-sharp" ? (
                    <Text style={{ fontSize: 18, color: "#005C71" }}>
                        {BPM}
                    </Text>
                ) : null}
                <AnimatedIcon
                    name={iconName}
                    size={24}
                    color={iconColor}
                    style={{
                        transform: [{ rotate: spin }],
                    }}
                    onPress={() => {
                        setIconPressed(!iconPressed);
                        pairingBand();
                        //rotate();
                    }}
                />
            </View>
            {/* 
                <Ionicons name="watch-outline" size={24} color="#005C71" />
                */}
        </View>
    );
};

const theme = StyleSheet.create({
    container: {
        marginTop: 35,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    logoText: {
        fontSize: 20,
        color: "#005C71",
    },
});

export default Header;
