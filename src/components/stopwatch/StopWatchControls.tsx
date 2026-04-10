import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

type Props = {
	isRunning: boolean;
	hasStarted: boolean;
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
};

export default function StopwatchControls({
	isRunning,
	hasStarted,
	onStart,
	onPause,
	onReset,
}: Props) {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			{/* Reset Button */}
			<TouchableOpacity
				onPress={onReset}
				disabled={!hasStarted}
				style={[
					styles.secondaryBtn,
					{
						backgroundColor: hasStarted
							? theme.colors.surface
							: theme.colors.surfaceSecondary,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.full,
					},
				]}
			>
				<Ionicons
					name="refresh-outline"
					size={22}
					color={hasStarted ? theme.colors.text : theme.colors.textMuted}
				/>
				<AppText
					variant="label"
					color={hasStarted ? theme.colors.text : theme.colors.textMuted}
				>
					Reset
				</AppText>
			</TouchableOpacity>

			{/* Start / Pause Button */}
			<TouchableOpacity
				onPress={isRunning ? onPause : onStart}
				style={[
					styles.primaryBtn,
					{
						backgroundColor: isRunning
							? theme.colors.error
							: theme.colors.primary,
						borderRadius: theme.radius.full,
					},
				]}
			>
				<Ionicons
					name={isRunning ? "pause-outline" : "play-outline"}
					size={28}
					color={theme.colors.textOnPrimary}
				/>
				<AppText variant="label" color={theme.colors.textOnPrimary}>
					{isRunning ? "Pause" : hasStarted ? "Resume" : "Start"}
				</AppText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
	primaryBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	secondaryBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 14,
		paddingHorizontal: 24,
		borderWidth: 1,
	},
});
