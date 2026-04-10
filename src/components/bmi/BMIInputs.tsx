import React from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { styles } from "./BMIInputs.styles";
import type { UnitSystem } from "../../utils/bmi";

type Props = {
	weight: string;
	height: string;
	system: UnitSystem;
	onWeightChange: (v: string) => void;
	onHeightChange: (v: string) => void;
};

export default function BMIInputs({
	weight,
	height,
	system,
	onWeightChange,
	onHeightChange,
}: Props) {
	const { theme } = useTheme();

	const fields = [
		{
			label: "Weight",
			value: weight,
			unit: system === "metric" ? "kg" : "lb",
			onChange: onWeightChange,
		},
		{
			label: "Height",
			value: height,
			unit: system === "metric" ? "cm" : "in",
			onChange: onHeightChange,
		},
	];

	return (
		<View style={styles.row}>
			{fields.map((field) => (
				<View key={field.label} style={styles.group}>
					<AppText variant="label" style={styles.label}>
						{field.label}
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
							value={field.value}
							onChangeText={field.onChange}
							keyboardType="numeric"
							placeholder="0"
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
							{field.unit}
						</AppText>
					</View>
				</View>
			))}
		</View>
	);
}
