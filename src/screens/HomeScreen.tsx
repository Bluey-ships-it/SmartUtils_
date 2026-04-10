import React from "react";
import { FlatList, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { TOOLS } from "../constants/tools";
import ScreenWrapper from "../components/ScreenWrapper";
import ToolCard from "../components/ToolCard";
import AppText from "../components/AppText";
import type { RootStackParamList } from "../types/navigation";
import type { Tool } from "../types/tools";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
	const navigation = useNavigation<NavigationProp>();
	const { theme, isDark, toggleTheme } = useTheme();

	function handleToolPress(tool: Tool) {
		navigation.navigate(tool.route);
	}

	return (
		<ScreenWrapper>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<AppText variant="heading">Smart Toolkit</AppText>
					<AppText variant="caption">Pick a tool to get started</AppText>
				</View>
				<TouchableOpacity
					onPress={toggleTheme}
					style={[
						styles.themeBtn,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<Ionicons
						name={isDark ? "sunny-outline" : "moon-outline"}
						size={20}
						color={theme.colors.text}
					/>
				</TouchableOpacity>
			</View>
			<FlatList
				data={TOOLS}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ToolCard tool={item} onPress={() => handleToolPress(item)} />
				)}
				contentContainerStyle={{
					paddingBottom: theme.spacing.xl,
				}}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
		paddingTop: 24,
		paddingBottom: 20,
	},
	headerText: {
		gap: 4,
	},
	themeBtn: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
});
