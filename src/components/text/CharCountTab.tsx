import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

function getCharStats(text: string) {
	const total = text.length;
	const noSpaces = text.replace(/\s/g, "").length;
	const spaces = text.replace(/[^\s]/g, "").length;
	const letters = text.replace(/[^a-zA-Z]/g, "").length;
	const numbers = text.replace(/[^0-9]/g, "").length;
	const special = text.replace(/[a-zA-Z0-9\s]/g, "").length;

	return { total, noSpaces, spaces, letters, numbers, special };
}

export default function CharCountTab() {
	const { theme } = useTheme();
	const [text, setText] = useState("");

	const stats = getCharStats(text);

	return (
		<View>
			<AppText variant="label" style={styles.sectionLabel}>
				Enter text
			</AppText>
			<View
				style={[
					styles.inputWrapper,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.md,
					},
				]}
			>
				<TextInput
					value={text}
					onChangeText={setText}
					multiline
					placeholder="Paste or type your text here..."
					placeholderTextColor={theme.colors.textMuted}
					style={[
						styles.input,
						{
							color: theme.colors.text,
							fontSize: theme.fontSizes.md,
						},
					]}
				/>
			</View>

			{/* Clear Button */}
			{text.length > 0 && (
				<TouchableOpacity
					onPress={() => setText("")}
					style={[
						styles.clearBtn,
						{
							backgroundColor: theme.colors.surfaceSecondary,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<AppText variant="label" color={theme.colors.textSecondary}>
						Clear text
					</AppText>
				</TouchableOpacity>
			)}

			{/* Stats Grid */}
			<View style={styles.statsGrid}>
				{[
					{ label: "Total chars", value: stats.total },
					{ label: "No spaces", value: stats.noSpaces },
					{ label: "Spaces", value: stats.spaces },
					{ label: "Letters", value: stats.letters },
					{ label: "Numbers", value: stats.numbers },
					{ label: "Special", value: stats.special },
				].map((stat) => (
					<View
						key={stat.label}
						style={[
							styles.statCard,
							{
								backgroundColor: theme.colors.surface,
								borderColor: theme.colors.border,
								borderRadius: theme.radius.md,
								padding: theme.spacing.md,
							},
						]}
					>
						<AppText variant="heading" color={theme.colors.primary}>
							{stat.value}
						</AppText>
						<AppText variant="caption">{stat.label}</AppText>
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionLabel: {
		marginBottom: 8,
	},
	inputWrapper: {
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom: 12,
		minHeight: 160,
	},
	input: {
		flex: 1,
		textAlignVertical: "top",
		minHeight: 140,
		lineHeight: 22,
	},
	clearBtn: {
		alignItems: "center",
		paddingVertical: 10,
		borderWidth: 1,
		marginBottom: 24,
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		marginBottom: 32,
	},
	statCard: {
		width: "47%",
		borderWidth: 1,
		gap: 4,
	},
});
