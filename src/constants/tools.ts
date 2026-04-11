import type { Tool } from "../types/tools";

export const TOOLS: Tool[] = [
	{
		id: "conversion",
		name: "Conversion",
		description: "Unit, temperature and currency",
		icon: "swap-horizontal-outline",
		route: "Conversion",
	},
	{
		id: "calculator",
		name: "Calculator",
		description: "BMI, tip and bill split",
		icon: "calculator-outline",
		route: "Calculator",
	},
	{
		id: "text",
		name: "Text Tools",
		description: "Word count, character count and case converter",
		icon: "text-outline",
		route: "Text",
	},
	{
		id: "time",
		name: "Time Tools",
		description: "Stopwatch and countdown timer",
		icon: "time-outline",
		route: "Time",
	},
];
