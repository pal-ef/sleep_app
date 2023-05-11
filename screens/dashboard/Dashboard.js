import React from "react";
import { Views, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
    VictoryPie,
    VictoryChart,
    VictoryGroup,
    VictoryBar,
} from "victory-native";

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

const Dashboard = (props) => {
    return (
        <ScrollView>
            <Text style={theme.textTitle}>Distribución de ciclos de sueño</Text>
                <VictoryPie
                    colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                    data={data}
                    padding={70}
                    padAngle={({ datum }) => datum.y - datum.y * 0.93}
                    cornerRadius={10}
                    innerRadius={25}
                    radius={({ datum }) => 50 + datum.y * 1.5}
                    style={{ labels: { fontSize: 16 }, background: { fill : "lavander"}}}
                    labelPlacement={"perpendicular"}
                />

            <Text style={theme.textTitle2}>
                Relación horas dormidas y calidad
            </Text>
                <VictoryChart>
                    <VictoryGroup offset={20} colorScale={"qualitative"}>
                        <VictoryBar
                            data={[
                                { x: 1, y: 1 },
                                { x: 2, y: 2 },
                                { x: 3, y: 5 },
                            ]}
                        />
                        <VictoryBar
                            data={[
                                { x: 1, y: 2 },
                                { x: 2, y: 1 },
                                { x: 3, y: 7 },
                            ]}
                        />
                        <VictoryBar
                            data={[
                                { x: 1, y: 3 },
                                { x: 2, y: 4 },
                                { x: 3, y: 9 },
                            ]}
                        />
                    </VictoryGroup>
                </VictoryChart>
        </ScrollView>
    );
};

const theme = StyleSheet.create({
    textTitle: {
        marginVertical: 20,
        color: "#3A3A3A",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "500",
    },
    textTitle2: {
        color: "#3A3A3A",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "500",
    },
});
export default Dashboard;
