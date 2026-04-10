import React, { useState } from "react";
import {
	View,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { CURRENCIES } from "../../constants/currencies";
import type { Currency } from "../../types/converter";

type Props = {
	label: string;
	selected: Currency;
	onChange: (currency: Currency) => void;
};

export default function CurrencySelector({ label, selected, onChange }: Props) {
	const { theme } = useTheme();
	const [open, setOpen] = useState(false);

	function handleSelect(currency: Currency) {
		onChange(currency);
		setOpen(false);
	}

	return (
		<View style={styles.container}>
			<AppText variant="label" style={styles.sectionLabel}>
				{label}
			</AppText>
			<TouchableOpacity
				onPress={() => setOpen(true)}
				style={[
					styles.selector,
					{
						backgroundColor: theme.colors.surface,
						borderColor: theme.colors.border,
						borderRadius: theme.radius.md,
					},
				]}
			>
				<View style={styles.selectorLeft}>
					<AppText variant="subheading" color={theme.colors.primary}>
						{selected.symbol}
					</AppText>
					<View style={styles.selectorText}>
						<AppText variant="body">{selected.code}</AppText>
						<AppText variant="caption">{selected.label}</AppText>
					</View>
				</View>
				<Ionicons
					name="chevron-down-outline"
					size={18}
					color={theme.colors.textMuted}
				/>
			</TouchableOpacity>

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
							<AppText variant="subheading">Select Currency</AppText>
							<TouchableOpacity onPress={() => setOpen(false)}>
								<Ionicons
									name="close-outline"
									size={24}
									color={theme.colors.text}
								/>
							</TouchableOpacity>
						</View>
						<FlatList
							data={CURRENCIES}
							keyExtractor={(item) => item.code}
							renderItem={({ item }) => {
								const active = item.code === selected.code;
								return (
									<TouchableOpacity
										onPress={() => handleSelect(item)}
										style={[
											styles.currencyItem,
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
										<AppText
											variant="subheading"
											color={active ? theme.colors.primary : theme.colors.text}
											style={styles.symbol}
										>
											{item.symbol}
										</AppText>
										<View style={styles.currencyText}>
											<AppText variant="body">{item.code}</AppText>
											<AppText variant="caption">{item.label}</AppText>
										</View>
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
	selector: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	selectorLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	selectorText: {
		gap: 2,
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.4)",
	},
	modalSheet: {
		maxHeight: "70%",
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
	currencyItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	symbol: {
		width: 32,
		textAlign: "center",
	},
	currencyText: {
		flex: 1,
		gap: 2,
	},
});
