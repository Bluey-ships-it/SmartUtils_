import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { TempUnit } from "./TemperatureUnitSelector";
import { UNIT_SYMBOLS } from "./TemperatureUnitSelector";

export type ConversionResult = {
	unit: TempUnit;
	value: string;
};

type Props = {
	results: ConversionResult[];
};

export default function TemperatureResult({ results }: Props) {
	const { theme } = useTheme();

	if (results.length === 0) return null;

	return (
		<View style={styles.container}>
			<AppText variant="label" style={styles.sectionLabel}>
				Results
			</AppText>
			{results.map((result) => (
				<View
					key={result.unit}
					style={[
						styles.resultCard,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
							padding: theme.spacing.md,
							marginBottom: theme.spacing.sm,
						},
					]}
				>
					<AppText variant="caption">{result.unit}</AppText>
					<AppText variant="heading" color={theme.colors.primary}>
						{result.value}
						<AppText variant="body" color={theme.colors.textSecondary}>
							{" "}
							{UNIT_SYMBOLS[result.unit]}
						</AppText>
					</AppText>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 32,
	},
	sectionLabel: {
		marginBottom: 8,
	},
	resultCard: {
		borderWidth: 1,
		gap: 4,
	},
});
