import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VictoryPie, VictoryLabel } from "victory-native";

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
  }

// dummy data
const data = [
    { x: "Despierto", y: getRandomInt(15, 60) },
    { x: "Sueño ligero", y: getRandomInt(15, 60) },
    { x: "Sueño profundo", y: getRandomInt(15, 60) },
    { x: "REM", y: getRandomInt(15, 60) },
    { x: "Vigilia", y: getRandomInt(15, 60) },
];

const Dashboard = () => {
    return (
        <SafeAreaView>
            <View style={theme.container}>
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    data={data}
                    padding={70}
                    padAngle={({ datum }) => datum.y - datum.y * 0.93}
                    cornerRadius={10}
                    innerRadius={25}
                    radius={({ datum }) => 50 + datum.y * 1.5}
                    style={{ labels: { fontSize: 16 } }}
                    labelPlacement={"perpendicular"}
                />
            </View>
        </SafeAreaView>
    );
};

const theme = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
    },
});
export default Dashboard;
