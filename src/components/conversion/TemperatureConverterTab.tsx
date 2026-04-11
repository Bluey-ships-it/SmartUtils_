import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import TemperatureUnitSelector from "../temperature/TemperatureUnitSelector";
import TemperatureResult from "../temperature/TemperatureResult";
import type { TempUnit } from "../temperature/TemperatureUnitSelector";
import type { ConversionResult } from "../temperature/TemperatureResult";
import { UNIT_SYMBOLS } from "../temperature/TemperatureUnitSelector";

function convert(value: number, from: TempUnit): ConversionResult[] {
	let celsius: number;

	switch (from) {
		case "Celsius":
			celsius = value;
			break;
		case "Fahrenheit":
			celsius = (value - 32) * (5 / 9);
			break;
		case "Kelvin":
			celsius = value - 273.15;
			break;
	}

	const results: Record<TempUnit, number> = {
		Celsius: celsius,
		Fahrenheit: celsius * (9 / 5) + 32,
		Kelvin: celsius + 273.15,
	};

	return (Object.keys(results) as TempUnit[])
		.filter((unit) => unit !== from)
		.map((unit) => ({
			unit,
			value: results[unit].toFixed(2),
		}));
}

export default function TemperatureConverterTab() {
	const { theme } = useTheme();
	const [input, setInput] = useState("");
	const [selectedUnit, setSelectedUnit] = useState<TempUnit>("Celsius");

	const results: ConversionResult[] =
		input.trim() !== "" && !isNaN(Number(input))
			? convert(Number(input), selectedUnit)
			: [];

	return (
		<View>
			<TemperatureUnitSelector
				selected={selectedUnit}
				onChange={setSelectedUnit}
			/>
			<AppText variant="label" style={styles.sectionLabel}>
				Enter value
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
					value={input}
					onChangeText={setInput}
					keyboardType="numeric"
					placeholder={`Value in ${selectedUnit}`}
					placeholderTextColor={theme.colors.textMuted}
					style={[
						styles.input,
						{
							color: theme.colors.text,
							fontSize: theme.fontSizes.xl,
						},
					]}
				/>
				<AppText variant="label" color={theme.colors.textMuted}>
					{UNIT_SYMBOLS[selectedUnit]}
				</AppText>
			</View>
			<TemperatureResult results={results} />
		</View>
	);
}

const styles = StyleSheet.create({
	sectionLabel: {
		marginBottom: 8,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 4,
		marginBottom: 24,
	},
	input: {
		flex: 1,
		paddingVertical: 14,
	},
});
