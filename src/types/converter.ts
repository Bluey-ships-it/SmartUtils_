export type Unit = {
	label: string;
	value: string;
	factor: number;
};

export type UnitCategory = {
	label: string;
	value: string;
	units: Unit[];
};

export type ConversionResult = {
	value: number;
	formatted: string;
	fromUnit: string;
	toUnit: string;
};

export type Currency = {
	code: string;
	label: string;
	symbol: string;
	rateToUSD: number;
};
