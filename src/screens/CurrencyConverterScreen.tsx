import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import AppText from "../components/AppText";
import CurrencySelector from "../components/currency/CurrencySelector";
import CurrencyResult from "../components/currency/CurrencyResult";
import { CURRENCIES } from "../constants/currencies";
import type { Currency } from "../types/converter";
import ScreenHeader from "../components/ScreenHeader";

export default function CurrencyConverterScreen() {
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [amount, setAmount] = useState("");
	const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCIES[0]);
	const [toCurrency, setToCurrency] = useState<Currency>(CURRENCIES[1]);

	function handleSwap() {
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
	}

	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<ScreenHeader title="Currency Converter"/>

				{/* Amount Input */}
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

				{/* From Selector */}
				<CurrencySelector
					label="From"
					selected={fromCurrency}
					onChange={setFromCurrency}
				/>

				{/* Swap Button */}
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

				{/* To Selector */}
				<CurrencySelector
					label="To"
					selected={toCurrency}
					onChange={setToCurrency}
				/>

				{/* Result */}
				<CurrencyResult amount={amount} from={fromCurrency} to={toCurrency} />
			</ScrollView>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 16,
		paddingBottom: 24,
	},
	backBtn: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
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
