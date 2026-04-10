import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import type { Unit, UnitCategory } from "../../types/converter";

type Props = {
	label: string;
	value: string;
	selectedUnit: Unit;
	category: UnitCategory;
	onValueChange?: (val: string) => void;
	onUnitChange: (unit: Unit) => void;
	editable?: boolean;
};

export default function UnitInput({
	label,
	value,
	selectedUnit,
	category,
	onValueChange,
	onUnitChange,
	editable = true,
}: Props) {
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);

	function handleSelect(unit: Unit) {
		onUnitChange(unit);
		setOpen(false);
	}

	return (
		<View style={styles.container}>
			<AppText variant="label" style={styles.sectionLabel}>
				{label}
			</AppText>

			{/* Input Row */}
			<View
				style={[
					styles.inputRow,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.md,
					},
				]}
			>
				<TextInput
					value={value}
					onChangeText={onValueChange}
					keyboardType="numeric"
					placeholder="0"
					placeholderTextColor={theme.colors.textMuted}
					editable={editable}
					style={[
						styles.input,
						{
							color: editable ? theme.colors.text : theme.colors.primary,
							fontSize: theme.fontSizes.xl,
						},
					]}
				/>
				<TouchableOpacity
					onPress={() => setOpen(true)}
					style={[
						styles.unitPicker,
						{
							backgroundColor: theme.colors.primaryLight,
							borderLeftColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<AppText variant="label" color={theme.colors.primary}>
						{selectedUnit.label}
					</AppText>
					<Ionicons
						name="chevron-down-outline"
						size={14}
						color={theme.colors.primary}
					/>
				</TouchableOpacity>
			</View>

			{/* Unit Picker Modal */}
			<Modal visible={open} animationType="slide" transparent>
				<View style={styles.modalOverlay}>
					<View
						style={[
							styles.modalSheet,
							{
								backgroundColor: theme.colors.background,
								borderRadius: theme.radius.xl,
							},
						]}
					>
						<View style={styles.modalHeader}>
							<AppText variant="subheading">Select Unit</AppText>
							<TouchableOpacity onPress={() => setOpen(false)}>
								<Ionicons
									name="close-outline"
									size={24}
									color={theme.colors.text}
								/>
							</TouchableOpacity>
						</View>
						<FlatList
							data={category.units}
							keyExtractor={(item) => item.value}
							renderItem={({ item }) => {
								const active = item.value === selectedUnit.value;
								return (
									<TouchableOpacity
										onPress={() => handleSelect(item)}
										style={[
											styles.unitItem,
											{
												backgroundColor: active
													? theme.colors.primaryLight
													: "transparent",
												borderRadius: theme.radius.md,
												paddingHorizontal: theme.spacing.md,
												paddingVertical: theme.spacing.sm,
											},
										]}
									>
										<AppText variant="body">{item.label}</AppText>
										{active && (
											<Ionicons
												name="checkmark-outline"
												size={18}
												color={theme.colors.primary}
											/>
										)}
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 24,
	},
	sectionLabel: {
		marginBottom: 8,
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		overflow: "hidden",
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	unitPicker: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 14,
		borderLeftWidth: 1,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalSheet: {
		maxHeight: "60%",
		paddingTop: 16,
		paddingBottom: 32,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 12,
	},
	unitItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
