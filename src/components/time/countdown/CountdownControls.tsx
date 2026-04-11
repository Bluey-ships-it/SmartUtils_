import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import AppText from "../../AppText";
import type { CountdownState } from "../../../utils/countdown";

type Props = {
	state: CountdownState;
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
};

export default function CountdownControls({
	state,
	onStart,
	onPause,
	onReset,
}: Props) {
	const { theme } = useTheme();

	const isRunning = state === "running";
	const isFinished = state === "finished";
	const hasStarted = state !== "idle";

	return (
		<View style={styles.container}>
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

			<TouchableOpacity
				onPress={isRunning ? onPause : onStart}
				disabled={isFinished}
				style={[
					styles.primaryBtn,
					{
						backgroundColor: isFinished
							? theme.colors.surfaceSecondary
							: isRunning
								? theme.colors.error
								: theme.colors.primary,
						borderRadius: theme.radius.full,
					},
				]}
			>
				<Ionicons
					name={isRunning ? "pause-outline" : "play-outline"}
					size={28}
					color={
						isFinished ? theme.colors.textMuted : theme.colors.textOnPrimary
					}
				/>
				<AppText
					variant="label"
					color={
						isFinished ? theme.colors.textMuted : theme.colors.textOnPrimary
					}
				>
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
