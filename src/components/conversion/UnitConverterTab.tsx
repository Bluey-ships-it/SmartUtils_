import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import CategorySelector from "../unit/CategorySelector";
import UnitInput from "../unit/UnitInput";
import UnitResult from "../unit/UnitResult";
import { UNIT_CATEGORIES } from "../../constants/units";
import type { Unit, UnitCategory } from "../../types/converter";

function convert(value: number, from: Unit, to: Unit): string {
	const result = (value * from.factor) / to.factor;
	return parseFloat(result.toFixed(6)).toString();
}

export default function UnitConverterTab() {
	const { theme } = useTheme();

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
		<View>
			<CategorySelector selected={category} onChange={handleCategoryChange} />
			<UnitInput
				label="From"
				value={inputValue}
				selectedUnit={fromUnit}
				category={category}
				onValueChange={setInputValue}
				onUnitChange={setFromUnit}
				editable={true}
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
					Swap units
				</AppText>
			</TouchableOpacity>
			<UnitInput
				label="To"
				value={outputValue}
				selectedUnit={toUnit}
				category={category}
				onUnitChange={setToUnit}
				editable={false}
			/>
			<UnitResult
				fromValue={inputValue}
				fromUnit={fromUnit}
				toValue={outputValue}
				toUnit={toUnit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
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
