import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import AppText from "../components/AppText";

type TempUnit = "Celsius" | "Fahrenheit" | "Kelvin";

type ConversionResult = {
	unit: TempUnit;
	value: string;
};

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

const UNITS: TempUnit[] = ["Celsius", "Fahrenheit", "Kelvin"];

const UNIT_SYMBOLS: Record<TempUnit, string> = {
	Celsius: "°C",
	Fahrenheit: "°F",
	Kelvin: "K",
};

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
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={[
							styles.backBtn,
							{
								backgroundColor: theme.colors.surface,
								borderColor: theme.colors.border,
								borderRadius: theme.radius.md,
							},
						]}
					>
						<Ionicons
							name="arrow-back-outline"
							size={20}
							color={theme.colors.text}
						/>
					</TouchableOpacity>
					<AppText variant="subheading">Temperature</AppText>
					<View style={styles.backBtn} />
				</View>

				{/* Unit Selector */}
				<AppText variant="label" style={styles.sectionLabel}>
					Convert from
				</AppText>
				<View style={styles.unitRow}>
					{UNITS.map((unit) => {
						const active = unit === selectedUnit;
						return (
							<TouchableOpacity
								key={unit}
								onPress={() => setSelectedUnit(unit)}
								style={[
									styles.unitBtn,
									{
										backgroundColor: active
											? theme.colors.primary
											: theme.colors.surface,
										borderColor: active
											? theme.colors.primary
											: theme.colors.border,
										borderRadius: theme.radius.md,
									},
								]}
							>
								<AppText
									variant="label"
									color={
										active ? theme.colors.textOnPrimary : theme.colors.text
									}
								>
									{UNIT_SYMBOLS[unit]}
								</AppText>
								<AppText
									variant="caption"
									color={
										active ? theme.colors.textOnPrimary : theme.colors.textMuted
									}
								>
									{unit}
								</AppText>
							</TouchableOpacity>
						);
					})}
				</View>

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
				{results.length > 0 && (
					<View style={styles.resultsSection}>
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
				)}
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
	unitRow: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 24,
	},
	unitBtn: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		borderWidth: 1,
		gap: 2,
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
	resultsSection: {
		marginBottom: 32,
	},
	resultCard: {
		borderWidth: 1,
		gap: 4,
	},
});
