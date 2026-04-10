import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { Unit } from "../../types/converter";

type Props = {
	fromValue: string;
	fromUnit: Unit;
	toValue: string;
	toUnit: Unit;
};

export default function UnitResult({
	fromValue,
	fromUnit,
	toValue,
	toUnit,
}: Props) {
	const { theme } = useTheme();

	const isValid =
		fromValue.trim() !== "" &&
		!isNaN(Number(fromValue)) &&
		Number(fromValue) >= 0;

	if (!isValid) return null;

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.border,
					borderRadius: theme.radius.lg,
					padding: theme.spacing.lg,
				},
			]}
		>
			<AppText variant="caption">Result</AppText>
			<AppText variant="heading" color={theme.colors.primary}>
				{toValue}
			</AppText>
			<AppText variant="caption" color={theme.colors.textMuted}>
				{fromValue} {fromUnit.label} = {toValue} {toUnit.label}
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		gap: 6,
		marginBottom: 32,
	},
});
