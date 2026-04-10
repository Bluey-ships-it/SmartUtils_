import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

type Props = {
	elapsed: number;
};

function formatTime(ms: number): {
	minutes: string;
	seconds: string;
	centiseconds: string;
} {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	const centiseconds = Math.floor((ms % 1000) / 10);

	return {
		minutes: String(minutes).padStart(2, "0"),
		seconds: String(seconds).padStart(2, "0"),
		centiseconds: String(centiseconds).padStart(2, "0"),
	};
}

export default function StopwatchDisplay({ elapsed }: Props) {
	const { theme } = useTheme();
	const { minutes, seconds, centiseconds } = formatTime(elapsed);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.border,
					borderRadius: theme.radius.xl,
				},
			]}
		>
			<View style={styles.timeRow}>
				<AppText style={[styles.timeText, { color: theme.colors.text }]}>
					{minutes}
				</AppText>
				<AppText style={[styles.separator, { color: theme.colors.textMuted }]}>
					:
				</AppText>
				<AppText style={[styles.timeText, { color: theme.colors.text }]}>
					{seconds}
				</AppText>
				<AppText style={[styles.separator, { color: theme.colors.textMuted }]}>
					.
				</AppText>
				<AppText style={[styles.centiseconds, { color: theme.colors.primary }]}>
					{centiseconds}
				</AppText>
			</View>
			<AppText variant="caption" align="center">
				min : sec . cs
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		paddingVertical: 40,
		paddingHorizontal: 24,
		alignItems: "center",
		marginBottom: 40,
	},
	timeRow: {
		flexDirection: "row",
		alignItems: "baseline",
		marginBottom: 8,
	},
	timeText: {
		fontSize: 64,
		fontWeight: "700",
		letterSpacing: -2,
		fontVariant: ["tabular-nums"],
	},
	separator: {
		fontSize: 48,
		fontWeight: "300",
		marginHorizontal: 4,
	},
	centiseconds: {
		fontSize: 40,
		fontWeight: "700",
		fontVariant: ["tabular-nums"],
	},
});
