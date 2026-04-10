import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import AppText from "./AppText";
import type { Tool } from "../types/tools";

type Props = {
	tool: Tool;
	onPress: () => void;
};

export default function ToolCard({ tool, onPress }: Props) {
	const { theme } = useTheme();

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			style={[
				styles.card,
				{
					backgroundColor: theme.colors.surface,
					borderRadius: theme.radius.lg,
					padding: theme.spacing.md,
					borderColor: theme.colors.border,
					...theme.shadows.md,
				},
			]}
		>
			<View
				style={[
					styles.iconBox,
					{
						backgroundColor: theme.colors.primaryLight,
						borderRadius: theme.radius.md,
						padding: theme.spacing.sm,
					},
				]}
			>
				<Ionicons name={tool.icon} size={24} color={theme.colors.primary} />
			</View>
			<View style={styles.textBox}>
				<AppText variant="subheading">{tool.name}</AppText>
				<AppText variant="caption">{tool.description}</AppText>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		borderWidth: 1,
	},
	iconBox: {
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	textBox: {
		flex: 1,
		gap: 2,
	},
});
