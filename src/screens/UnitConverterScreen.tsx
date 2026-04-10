import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import ScreenWrapper from "../components/ScreenWrapper";
import AppText from "../components/AppText";
import CategorySelector from "../components/unit/CategorySelector";
import UnitInput from "../components/unit/UnitInput";
import UnitResult from "../components/unit/UnitResult";
import { UNIT_CATEGORIES } from "../constants/units";
import type { Unit, UnitCategory } from "../types/converter";

function convert(value: number, from: Unit, to: Unit): string {
	const result = (value * from.factor) / to.factor;
	return parseFloat(result.toFixed(6)).toString();
}

export default function UnitConverterScreen() {
	const { theme } = useTheme();
	const navigation = useNavigation();

	const [category, setCategory] = useState<UnitCategory>(UNIT_CATEGORIES[0]);
	const [fromUnit, setFromUnit] = useState<Unit>(UNIT_CATEGORIES[0].units[0]);
	const [toUnit, setToUnit] = useState<Unit>(UNIT_CATEGORIES[0].units[2]);
	const [inputValue, setInputValue] = useState("");

	const outputValue =
		inputValue.trim() !== "" && !isNaN(Number(inputValue))
			? convert(Number(inputValue), fromUnit, toUnit)
			: "";

	function handleCategoryChange(newCategory: UnitCategory) {
		setCategory(newCategory);
		setFromUnit(newCategory.units[0]);
		setToUnit(newCategory.units[1]);
		setInputValue("");
	}

	function handleSwap() {
		setFromUnit(toUnit);
		setToUnit(fromUnit);
		setInputValue(outputValue);
	}

	return (
		<ScreenWrapper>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={[
							styles.backBtn,
							{
								backgroundColor: theme.colors.surface,
								borderColor: theme.colors.border,
								borderRadius: theme.radius.md,
							},
						]}
					>
						<Ionicons
							name="arrow-back-outline"
							size={20}
							color={theme.colors.text}
						/>
					</TouchableOpacity>
					<AppText variant="subheading">Unit Converter</AppText>
					<View style={styles.backBtn} />
				</View>

				{/* Category Selector */}
				<CategorySelector selected={category} onChange={handleCategoryChange} />

				{/* From Input */}
				<UnitInput
					label="From"
					value={inputValue}
					selectedUnit={fromUnit}
					category={category}
					onValueChange={setInputValue}
					onUnitChange={setFromUnit}
					editable={true}
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
						Swap units
					</AppText>
				</TouchableOpacity>

				{/* To Input */}
				<UnitInput
					label="To"
					value={outputValue}
					selectedUnit={toUnit}
					category={category}
					onUnitChange={setToUnit}
					editable={false}
				/>

				{/* Result */}
				<UnitResult
					fromValue={inputValue}
					fromUnit={fromUnit}
					toValue={outputValue}
					toUnit={toUnit}
				/>
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
