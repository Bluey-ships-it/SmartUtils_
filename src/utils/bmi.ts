import type { ColorScheme } from "../constants/theme";

export type UnitSystem = "metric" | "imperial";

export type BMICategory = {
	label: string;
	range: string;
	color: string;
};

export function calculateBMI(
	weight: number,
	height: number,
	system: UnitSystem,
): number {
	if (system === "metric") {
		const heightInMeters = height / 100;
		return weight / (heightInMeters * heightInMeters);
	}
	return (703 * weight) / (height * height);
}

export function getBMICategory(
	bmi: number,
	colors: Pick<ColorScheme, "primary" | "warning" | "error" | "success">,
): BMICategory {
	if (bmi < 18.5)
		return { label: "Underweight", range: "Below 18.5", color: colors.primary };
	if (bmi < 25)
		return { label: "Normal", range: "18.5 – 24.9", color: colors.success };
	if (bmi < 30)
		return { label: "Overweight", range: "25 – 29.9", color: colors.warning };
	return { label: "Obese", range: "30 and above", color: colors.error };
}

export function getBMIPosition(bmi: number): number {
	const clamped = Math.min(Math.max(bmi, 10), 40);
	return ((clamped - 10) / 30) * 100;
}
