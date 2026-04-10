import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { Currency } from "../../types/converter";

type Props = {
	amount: string;
	from: Currency;
	to: Currency;
};

function convertCurrency(amount: number, from: Currency, to: Currency): string {
	const inUSD = amount / from.rateToUSD;
	const result = inUSD * to.rateToUSD;
	return result.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

export default function CurrencyResult({ amount, from, to }: Props) {
	const { theme } = useTheme();

	const isValid =
		amount.trim() !== "" && !isNaN(Number(amount)) && Number(amount) > 0;

	if (!isValid) return null;

	const result = convertCurrency(Number(amount), from, to);
	const rate = convertCurrency(1, from, to);

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: theme.colors.surface,
					borderColor: theme.colors.border,
					borderRadius: theme.radius.lg,
					padding: theme.spacing.lg,
				},
			]}
		>
			<AppText variant="caption">Converted amount</AppText>
			<AppText variant="heading" color={theme.colors.primary}>
				{to.symbol} {result}
			</AppText>
			<View
				style={[styles.divider, { backgroundColor: theme.colors.border }]}
			/>
			<AppText variant="caption" color={theme.colors.textMuted}>
				1 {from.code} = {to.symbol} {rate} {to.code}
			</AppText>
			<AppText variant="caption" color={theme.colors.textMuted}>
				Static rates · MVP only
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		gap: 6,
	},
	divider: {
		height: 1,
		marginVertical: 8,
	},
});
