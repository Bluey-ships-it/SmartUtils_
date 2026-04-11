import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import AppText from "../../AppText";
import { formatCountdown } from "../../../utils/countdown";
import type { CountdownState } from "../../../utils/countdown";

type Props = {
	remaining: number;
	total: number;
	state: CountdownState;
};

export default function CountdownDisplay({ remaining, total, state }: Props) {
	const { theme } = useTheme();

	const { hours, minutes, seconds } = formatCountdown(remaining);
	const progress = total > 0 ? remaining / total : 0;
	const isFinished = state === "finished";

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: isFinished
						? theme.colors.successLight
						: theme.colors.surface,
					borderColor: isFinished ? theme.colors.success : theme.colors.border,
					borderRadius: theme.radius.xl,
					marginBottom: 40,
				},
			]}
		>
			{/* Progress Bar */}
			<View
				style={[
					styles.progressTrack,
					{ backgroundColor: theme.colors.surfaceSecondary },
				]}
			>
				<View
					style={[
						styles.progressFill,
						{
							width: `${progress * 100}%`,
							backgroundColor: isFinished
								? theme.colors.success
								: theme.colors.primary,
							borderRadius: theme.radius.full,
						},
					]}
				/>
			</View>

			{/* Time or Finished */}
			{isFinished ? (
				<View style={styles.finishedBox}>
					<Ionicons
						name="checkmark-circle-outline"
						size={48}
						color={theme.colors.success}
					/>
					<AppText variant="subheading" color={theme.colors.success}>
						Time is up!
					</AppText>
				</View>
			) : (
				<View style={styles.timeRow}>
					<AppText style={[styles.timeText, { color: theme.colors.text }]}>
						{hours}
					</AppText>
					<AppText
						style={[styles.separator, { color: theme.colors.textMuted }]}
					>
						:
					</AppText>
					<AppText style={[styles.timeText, { color: theme.colors.text }]}>
						{minutes}
					</AppText>
					<AppText
						style={[styles.separator, { color: theme.colors.textMuted }]}
					>
						:
					</AppText>
					<AppText style={[styles.timeText, { color: theme.colors.primary }]}>
						{seconds}
					</AppText>
				</View>
			)}

			<AppText variant="caption" align="center">
				{isFinished ? "Countdown complete" : "hrs : min : sec"}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		paddingVertical: 40,
		paddingHorizontal: 24,
		alignItems: "center",
		gap: 16,
	},
	progressTrack: {
		width: "100%",
		height: 6,
		borderRadius: 999,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
	},
	timeRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	timeText: {
		fontSize: 56,
		fontWeight: "700",
		letterSpacing: -2,
		fontVariant: ["tabular-nums"],
	},
	separator: {
		fontSize: 40,
		fontWeight: "300",
		marginHorizontal: 4,
	},
	finishedBox: {
		alignItems: "center",
		gap: 8,
	},
});
