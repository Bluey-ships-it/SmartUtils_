import type { Tool } from "../types/tools";

export const TOOLS: Tool[] = [
	{
		id: "unit-converter",
		name: "Unit Converter",
		description: "Length, weight, volume and more",
		icon: "cash-outline",
		route: "UnitConverter",
	},
	{
		id: "currency-converter",
		name: "Currency Converter",
		description: "NGN, USD, EUR, GBP and more",
		icon: "cash-outline",
		route: "CurrencyConverter",
	},
	{
		id: "bmi-calculator",
		name: "BMI Calculator",
		description: "Calculate your body mass index",
		icon: "body-outline",
		route: "BMICalculator",
	},
	{
		id: "temperature-converter",
		name: "Temperature Converter",
		description: "Celsius, Fahrenheit and Kelvin",
		icon: "thermometer-outline",
		route: "TemperatureConverter",
	},
	{
		id: "stopwatch",
		name: "Stopwatch",
		description: "Track elapsed time precisely",
		icon: "stopwatch-outline",
		route: "Stopwatch",
	},
];
