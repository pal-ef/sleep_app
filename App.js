import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';

// Import stack navigator
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content"/>
      <StackNavigator />
    </NavigationContainer>
  );
}