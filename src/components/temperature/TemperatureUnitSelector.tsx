import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

export type TempUnit = "Celsius" | "Fahrenheit" | "Kelvin";

export const UNIT_SYMBOLS: Record<TempUnit, string> = {
	Celsius: "°C",
	Fahrenheit: "°F",
	Kelvin: "K",
};

const UNITS: TempUnit[] = ["Celsius", "Fahrenheit", "Kelvin"];

type Props = {
	selected: TempUnit;
	onChange: (unit: TempUnit) => void;
};

export default function TemperatureUnitSelector({ selected, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<View>
			<AppText variant="label" style={styles.sectionLabel}>
				Convert from
			</AppText>
			<View style={styles.unitRow}>
				{UNITS.map((unit) => {
					const active = unit === selected;
					return (
						<TouchableOpacity
							key={unit}
							onPress={() => onChange(unit)}
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
								color={active ? theme.colors.textOnPrimary : theme.colors.text}
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
		</View>
	);
}

const styles = StyleSheet.create({
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
});
