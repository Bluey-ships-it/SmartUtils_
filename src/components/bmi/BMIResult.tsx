import React from "react";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { styles } from "./BMIResult.styles";
import type { BMICategory } from "../../utils/bmi";

type Props = {
	bmi: number;
	category: BMICategory;
	position: number;
};

export default function BMIResult({ bmi, category, position }: Props) {
	const { theme } = useTheme();

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.border,
					borderRadius: theme.radius.lg,
					padding: theme.spacing.lg,
				},
			]}
		>
			<View style={styles.bmiValueRow}>
				<View>
					<AppText variant="caption">Your BMI</AppText>
					<AppText
						variant="heading"
						color={category.color}
						style={styles.bmiNumber}
					>
						{bmi.toFixed(1)}
					</AppText>
				</View>
				<View
					style={[
						styles.badge,
						{
							backgroundColor: category.color + "20",
							borderRadius: theme.radius.full,
							paddingHorizontal: theme.spacing.md,
							paddingVertical: theme.spacing.xs,
						},
					]}
				>
					<AppText variant="label" color={category.color}>
						{category.label}
					</AppText>
				</View>
			</View>

			<View style={styles.scaleWrapper}>
				<View style={[styles.scaleBar, { borderRadius: theme.radius.full }]}>
					<View
						style={[
							styles.scaleSegment,
							{ backgroundColor: theme.colors.primary },
						]}
					/>
					<View
						style={[
							styles.scaleSegment,
							{ backgroundColor: theme.colors.success },
						]}
					/>
					<View
						style={[
							styles.scaleSegment,
							{ backgroundColor: theme.colors.warning },
						]}
					/>
					<View
						style={[
							styles.scaleSegment,
							{ backgroundColor: theme.colors.error },
						]}
					/>
				</View>
				<View
					style={[
						styles.scaleIndicator,
						{
							left: `${position}%` as any,
							borderColor: category.color,
							backgroundColor: theme.colors.surface,
						},
					]}
				/>
			</View>

			<View style={styles.scaleLabels}>
				{["10", "18.5", "25", "30", "40"].map((label) => (
					<AppText key={label} variant="caption">
						{label}
					</AppText>
				))}
			</View>

			<AppText variant="caption" align="center" style={styles.rangeNote}>
				Healthy range is{" "}
				<AppText variant="caption" color={theme.colors.success}>
					18.5 – 24.9
				</AppText>
			</AppText>
		</View>
	);
}
