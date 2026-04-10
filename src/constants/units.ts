import { Unit, UnitCategory } from "../types/converter";


export const UNIT_CATEGORIES: UnitCategory[] = [
	{
		label: "Length",
		value: "length",
		units: [
			{ label: "Millimeter", value: "mm", factor: 0.001 },
			{ label: "Centimeter", value: "cm", factor: 0.01 },
			{ label: "Meter", value: "m", factor: 1 },
			{ label: "Kilometer", value: "km", factor: 1000 },
			{ label: "Inch", value: "in", factor: 0.0254 },
			{ label: "Foot", value: "ft", factor: 0.3048 },
			{ label: "Yard", value: "yd", factor: 0.9144 },
			{ label: "Mile", value: "mi", factor: 1609.34 },
		],
	},
	{
		label: "Weight",
		value: "weight",
		units: [
			{ label: "Milligram", value: "mg", factor: 0.000001 },
			{ label: "Gram", value: "g", factor: 0.001 },
			{ label: "Kilogram", value: "kg", factor: 1 },
			{ label: "Metric Ton", value: "t", factor: 1000 },
			{ label: "Pound", value: "lb", factor: 0.453592 },
			{ label: "Ounce", value: "oz", factor: 0.0283495 },
		],
	},
	{
		label: "Volume",
		value: "volume",
		units: [
			{ label: "Milliliter", value: "ml", factor: 0.001 },
			{ label: "Liter", value: "l", factor: 1 },
			{ label: "Gallon (US)", value: "gal", factor: 3.78541 },
			{ label: "Fluid Ounce", value: "fl_oz", factor: 0.0295735 },
			{ label: "Cup", value: "cup", factor: 0.236588 },
			{ label: "Pint", value: "pt", factor: 0.473176 },
		],
	},
	{
		label: "Speed",
		value: "speed",
		units: [
			{ label: "Meters per second", value: "mps", factor: 1 },
			{ label: "Kilometers per hour", value: "kph", factor: 0.277778 },
			{ label: "Miles per hour", value: "mph", factor: 0.44704 },
			{ label: "Knots", value: "kn", factor: 0.514444 },
		],
	},
	{
		label: "Distance",
		value: "distance",
		units: [
			{ label: "Meter", value: "m", factor: 1 },
			{ label: "Kilometer", value: "km", factor: 1000 },
			{ label: "Mile", value: "mi", factor: 1609.34 },
			{ label: "Nautical Mile", value: "nmi", factor: 1852 },
			{ label: "Foot", value: "ft", factor: 0.3048 },
			{ label: "Yard", value: "yd", factor: 0.9144 },
		],
	},
] as const;
