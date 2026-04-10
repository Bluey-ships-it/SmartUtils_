import React, { useState } from "react";
import {
	View,
	TextInput,
	ScrollView,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import AppText from "../components/AppText";
import TemperatureUnitSelector from "../components/temperature/TemperatureUnitSelector";
import TemperatureResult from "../components/temperature/TemperatureResult";
import type { TempUnit } from "../components/temperature/TemperatureUnitSelector";
import type { ConversionResult } from "../components/temperature/TemperatureResult";
import { UNIT_SYMBOLS } from "../components/temperature/TemperatureUnitSelector";
import ScreenHeader from "../components/ScreenHeader";

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

export default function TemperatureConverterScreen() {
	const { theme } = useTheme();
	const navigation = useNavigation();
	const [input, setInput] = useState("");
	const [selectedUnit, setSelectedUnit] = useState<TempUnit>("Celsius");

	const results: ConversionResult[] =
		input.trim() !== "" && !isNaN(Number(input))
			? convert(Number(input), selectedUnit)
			: [];

	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<ScreenHeader title="Temperature Converter" />

				{/* Unit Selector */}
				<TemperatureUnitSelector
					selected={selectedUnit}
					onChange={setSelectedUnit}
				/>

				{/* Input */}
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

				{/* Results */}
				<TemperatureResult results={results} />
			</ScrollView>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 16,
		paddingBottom: 24,
	},
	backBtn: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
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
