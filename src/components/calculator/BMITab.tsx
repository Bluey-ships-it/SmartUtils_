import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import UnitToggle from "../bmi/UnitToggle";
import BMIInputs from "../bmi/BMIInputs";
import BMIResult from "../bmi/BMIResult";
import { calculateBMI, getBMICategory, getBMIPosition } from "../../utils/bmi";
import type { UnitSystem } from "../../utils/bmi";

export default function BMITab() {
	const { theme } = useTheme();
	const [system, setSystem] = useState<UnitSystem>("metric");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [touched, setTouched] = useState(false);

	const isValid =
		weight.trim() !== "" &&
		height.trim() !== "" &&
		!isNaN(Number(weight)) &&
		!isNaN(Number(height)) &&
		Number(weight) > 0 &&
		Number(height) > 0;

	const bmi = isValid
		? calculateBMI(Number(weight), Number(height), system)
		: null;

	const category = bmi
		? getBMICategory(bmi, {
				primary: theme.colors.primary,
				warning: theme.colors.warning,
				error: theme.colors.error,
				success: theme.colors.success,
			})
		: null;

	const position = bmi ? getBMIPosition(bmi) : null;

	function handleWeightChange(val: string) {
		setWeight(val);
		setTouched(true);
	}

	function handleHeightChange(val: string) {
		setHeight(val);
		setTouched(true);
	}

	function handleSystemChange(newSystem: UnitSystem) {
		setSystem(newSystem);
		setWeight("");
		setHeight("");
		setTouched(false);
	}

	function getFeedback(): string | null {
		if (!touched) return null;
		if (weight.trim() === "" && height.trim() === "")
			return "Enter your weight and height to calculate BMI.";
		if (weight.trim() === "" || Number(weight) <= 0)
			return "Please enter a valid weight.";
		if (height.trim() === "" || Number(height) <= 0)
			return "Please enter a valid height.";
		if (isNaN(Number(weight)) || isNaN(Number(height)))
			return "Only numbers are allowed.";
		return null;
	}

	const feedback = getFeedback();

	return (
		<View>
			<UnitToggle value={system} onChange={handleSystemChange} />
			<BMIInputs
				weight={weight}
				height={height}
				system={system}
				onWeightChange={handleWeightChange}
				onHeightChange={handleHeightChange}
			/>
			{feedback !== null && (
				<View
					style={[
						styles.feedbackBox,
						{
							backgroundColor: theme.colors.errorLight,
							borderColor: theme.colors.error,
							borderRadius: theme.radius.md,
							padding: theme.spacing.md,
							marginBottom: theme.spacing.md,
						},
					]}
				>
					<Ionicons
						name="alert-circle-outline"
						size={16}
						color={theme.colors.error}
					/>
					<AppText variant="caption" color={theme.colors.error}>
						{feedback}
					</AppText>
				</View>
			)}
			{bmi && category && position !== null && (
				<BMIResult bmi={bmi} category={category} position={position} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	feedbackBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		borderWidth: 1,
	},
});
