import { Currency } from "../types/converter";

export const CURRENCIES: Currency[] = [
	{ code: "USD", label: "US Dollar", symbol: "$", rateToUSD: 1 },
	{ code: "NGN", label: "Nigerian Naira", symbol: "₦", rateToUSD: 1620 },
	{ code: "EUR", label: "Euro", symbol: "€", rateToUSD: 0.92 },
	{ code: "GBP", label: "British Pound", symbol: "£", rateToUSD: 0.79 },
	{ code: "GHS", label: "Ghanaian Cedi", symbol: "₵", rateToUSD: 15.8 },
	{ code: "KES", label: "Kenyan Shilling", symbol: "KSh", rateToUSD: 129 },
	{ code: "CAD", label: "Canadian Dollar", symbol: "CA$", rateToUSD: 1.36 },
	{ code: "JPY", label: "Japanese Yen", symbol: "¥", rateToUSD: 149.5 },
] as const;

export const BASE_CURRENCY = "USD";
