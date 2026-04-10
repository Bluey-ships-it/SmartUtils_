import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { styles } from "./UnitToggle.styles";
import type { UnitSystem } from "../../utils/bmi";

type Props = {
	value: UnitSystem;
	onChange: (system: UnitSystem) => void;
};

const OPTIONS: { value: UnitSystem; label: string }[] = [
	{ value: "metric", label: "Metric (kg/cm)" },
	{ value: "imperial", label: "Imperial (lb/in)" },
];

export default function UnitToggle({ value, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<View
			style={[
				styles.wrapper,
				{
					backgroundColor: theme.colors.surfaceSecondary,
					borderRadius: theme.radius.md,
				},
			]}
		>
			{OPTIONS.map((option) => {
				const active = option.value === value;
				return (
					<TouchableOpacity
						key={option.value}
						onPress={() => onChange(option.value)}
						style={[
							styles.btn,
							{
								backgroundColor: active ? theme.colors.surface : "transparent",
								borderRadius: theme.radius.sm,
								...(active ? theme.shadows.sm : {}),
							},
						]}
					>
						<AppText
							variant="label"
							color={active ? theme.colors.primary : theme.colors.textSecondary}
						>
							{option.label}
						</AppText>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
