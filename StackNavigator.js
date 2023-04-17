import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// We define a new stack navigator
const Stack = createNativeStackNavigator();

// We import the screens
import LogIn from "./screens/login/LogIn";
import Home from "./screens/home/Home";

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
