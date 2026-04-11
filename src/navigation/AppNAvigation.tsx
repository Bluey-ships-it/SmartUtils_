import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";

import HomeScreen from "../screens/HomeScreen";
import ConversionScreen from "../screens/ConversionScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import TextScreen from "../screens/TextScreen";
import TimeScreen from "../screens/TimeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
	const { theme } = useTheme();

	return (
		<NavigationContainer
			theme={{
				dark: theme.mode === "dark",
				colors: {
					primary: theme.colors.primary,
					background: theme.colors.background,
					card: theme.colors.background,
					text: theme.colors.text,
					border: theme.colors.border,
					notification: theme.colors.primary,
				},
				fonts: {
					regular: { fontFamily: "System", fontWeight: "400" },
					medium: { fontFamily: "System", fontWeight: "500" },
					bold: { fontFamily: "System", fontWeight: "700" },
					heavy: { fontFamily: "System", fontWeight: "900" },
				},
			}}
		>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
					animation: "slide_from_right",
					contentStyle: { backgroundColor: theme.colors.background },
				}}
			>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Conversion" component={ConversionScreen} />
				<Stack.Screen name="Calculator" component={CalculatorScreen} />
				<Stack.Screen name="Text" component={TextScreen} />
				<Stack.Screen name="Time" component={TimeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
