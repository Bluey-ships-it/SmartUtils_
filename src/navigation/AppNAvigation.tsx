import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";

import HomeScreen from "../screens/HomeScreen";
import UnitConverterScreen from "../screens/UnitConverterScreen";
import CurrencyConverterScreen from "../screens/CurrencyConverterScreen";
import BMICalculatorScreen from "../screens/BMICalculatorScreen";
import TemperatureConverterScreen from "../screens/TemperatureConverterScreen";
import StopwatchScreen from "../screens/StopwatchScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="UnitConverter" component={UnitConverterScreen} />
				<Stack.Screen
					name="CurrencyConverter"
					component={CurrencyConverterScreen}
				/>
				<Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
				<Stack.Screen
					name="TemperatureConverter"
					component={TemperatureConverterScreen}
				/>
				<Stack.Screen name="Stopwatch" component={StopwatchScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
