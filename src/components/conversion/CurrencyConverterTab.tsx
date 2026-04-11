import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import CurrencySelector from "../currency/CurrencySelector";
import CurrencyResult from "../currency/CurrencyResult";
import { CURRENCIES } from "../../constants/currencies";
import type { Currency } from "../../types/converter";

export default function CurrencyConverterTab() {
	const { theme } = useTheme();
	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
	const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]);

	function handleSwap() {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	}

	return (
		<View>
			<AppText variant="label" style={styles.sectionLabel}>
				Amount
			</AppText>
			<View
				style={[
					styles.inputWrapper,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.md,
					},
				]}
			>
				<AppText variant="subheading" color={theme.colors.textMuted}>
					{fromCurrency.symbol}
				</AppText>
				<TextInput
					value={amount}
					onChangeText={setAmount}
					keyboardType="numeric"
					placeholder="0.00"
					placeholderTextColor={theme.colors.textMuted}
					style={[
						styles.input,
						{
							color: theme.colors.text,
							fontSize: theme.fontSizes.xl,
						},
					]}
				/>
			</View>
			<CurrencySelector
				label="From"
				selected={fromCurrency}
				onChange={setFromCurrency}
			/>
			<TouchableOpacity
				onPress={handleSwap}
				style={[
					styles.swapBtn,
					{
						backgroundColor: theme.colors.primaryLight,
						borderRadius: theme.radius.full,
						borderColor: theme.colors.primary,
					},
				]}
			>
				<Ionicons
					name="swap-vertical-outline"
					size={20}
					color={theme.colors.primary}
				/>
				<AppText variant="label" color={theme.colors.primary}>
					Swap currencies
				</AppText>
			</TouchableOpacity>
			<CurrencySelector
				label="To"
				selected={toCurrency}
				onChange={setToCurrency}
			/>
			<CurrencyResult amount={amount} from={fromCurrency} to={toCurrency} />
		</View>
	);
}

const styles = StyleSheet.create({
	sectionLabel: {
		marginBottom: 8,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 4,
		marginBottom: 24,
	},
	input: {
		flex: 1,
		paddingVertical: 14,
	},
	swapBtn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		paddingVertical: 12,
		borderWidth: 1,
		marginBottom: 24,
	},
});
