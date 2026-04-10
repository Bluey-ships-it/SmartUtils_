import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import BMIHeader from "../components/bmi/BMIHeader";
import UnitToggle from "../components/bmi/UnitToggle";
import BMIInputs from "../components/bmi/BMIInputs";
import BMIResult from "../components/bmi/BMIResult";
import { calculateBMI, getBMICategory, getBMIPosition } from "../utils/bmi";
import type { UnitSystem } from "../utils/bmi";

export default function BMICalculatorScreen() {
	const { theme } = useTheme();
	const [system, setSystem] = useState<UnitSystem>("metric");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");

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

	function handleSystemChange(newSystem: UnitSystem) {
		setSystem(newSystem);
		setWeight("");
		setHeight("");
	}

	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				<BMIHeader />
				<UnitToggle value={system} onChange={handleSystemChange} />
				<BMIInputs
					weight={weight}
					height={height}
					system={system}
					onWeightChange={setWeight}
					onHeightChange={setHeight}
				/>
				{bmi && category && position !== null && (
					<BMIResult bmi={bmi} category={category} position={position} />
				)}
			</ScrollView>
		</ScreenWrapper>
	);
}
