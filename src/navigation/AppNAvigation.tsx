import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import type { RootStackParamList } from "../types/navigation";
import { useTheme } from "../context/ThemeContext";
import { TOOLS } from "../constants/tools";

import ConversionScreen from "../screens/ConversionScreen";
import CalculatorScreen from "../screens/CalculatorScreen";
import TextScreen from "../screens/TextScreen";
import TimeScreen from "../screens/TimeScreen";
import TasksScreen from "../screens/TasksScreen";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AppNavigator() {
	const { theme } = useTheme();
	const iconByRoute = Object.fromEntries(
		TOOLS.map((tool) => [tool.route, tool.icon]),
	) as Record<keyof RootStackParamList, keyof typeof Ionicons.glyphMap>;

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
			<Tab.Navigator
				initialRouteName="Conversion"
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: theme.colors.primary,
					tabBarInactiveTintColor: theme.colors.textMuted,
					tabBarStyle: {
						backgroundColor: theme.colors.surface,
						borderTopColor: theme.colors.border,
						borderTopWidth: 1,
					},
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name={iconByRoute[route.name] ?? "ellipse-outline"}
							size={size}
							color={color}
						/>
					),
				})}
			>
				<Tab.Screen name="Conversion" component={ConversionScreen} />
				<Tab.Screen name="Calculator" component={CalculatorScreen} />
				<Tab.Screen name="Text" component={TextScreen} />
				<Tab.Screen name="Time" component={TimeScreen} />
				<Tab.Screen
					name="Tasks"
					component={TasksScreen}
					options={{ title: "Tasks" }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
