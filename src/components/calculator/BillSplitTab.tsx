import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

export default function BillSplitTab() {
	const { theme } = useTheme();
	const [bill, setBill] = useState("");
	const [people, setPeople] = useState("2");
	const [tip, setTip] = useState("0");

	const billAmount = parseFloat(bill) || 0;
	const numPeople = Math.max(1, parseInt(people) || 1);
	const tipPercent = parseFloat(tip) || 0;

	const tipAmount = (billAmount * tipPercent) / 100;
	const total = billAmount + tipAmount;
	const perPerson = total / numPeople;

	const isValid = billAmount > 0 && numPeople > 0;

	return (
		<View>
			{/* Bill Amount */}
			<AppText variant="label" style={styles.sectionLabel}>
				Total bill
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
					₦
				</AppText>
				<TextInput
					value={bill}
					onChangeText={setBill}
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

			{/* Tip */}
			<AppText variant="label" style={styles.sectionLabel}>
				Tip (optional)
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
				<TextInput
					value={tip}
					onChangeText={setTip}
					keyboardType="numeric"
					placeholder="0"
					placeholderTextColor={theme.colors.textMuted}
					style={[
						styles.input,
						{
							color: theme.colors.text,
							fontSize: theme.fontSizes.xl,
						},
					]}
				/>
				<AppText variant="label" color={theme.colors.textMuted}>
					%
				</AppText>
			</View>

			{/* Number of People */}
			<AppText variant="label" style={styles.sectionLabel}>
				Split between
			</AppText>
			<View style={styles.stepperRow}>
				<TouchableOpacity
					onPress={() =>
						setPeople((prev) => String(Math.max(1, parseInt(prev) - 1)))
					}
					style={[
						styles.stepperBtn,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<AppText variant="subheading" color={theme.colors.primary}>
						−
					</AppText>
				</TouchableOpacity>
				<View
					style={[
						styles.stepperDisplay,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<AppText variant="subheading">{people}</AppText>
					<AppText variant="caption" color={theme.colors.textMuted}>
						people
					</AppText>
				</View>
				<TouchableOpacity
					onPress={() => setPeople((prev) => String(parseInt(prev) + 1))}
					style={[
						styles.stepperBtn,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<AppText variant="subheading" color={theme.colors.primary}>
						+
					</AppText>
				</TouchableOpacity>
			</View>

			{/* Result */}
			{isValid && (
				<View
					style={[
						styles.resultCard,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.lg,
							padding: theme.spacing.lg,
						},
					]}
				>
					<View style={styles.resultRow}>
						<AppText variant="caption">Bill</AppText>
						<AppText variant="body" color={theme.colors.text}>
							₦{billAmount.toFixed(2)}
						</AppText>
					</View>
					{tipPercent > 0 && (
						<>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.colors.border },
								]}
							/>
							<View style={styles.resultRow}>
								<AppText variant="caption">Tip ({tipPercent}%)</AppText>
								<AppText variant="body" color={theme.colors.text}>
									₦{tipAmount.toFixed(2)}
								</AppText>
							</View>
						</>
					)}
					<View
						style={[styles.divider, { backgroundColor: theme.colors.border }]}
					/>
					<View style={styles.resultRow}>
						<AppText variant="caption">Total</AppText>
						<AppText variant="body" color={theme.colors.text}>
							₦{total.toFixed(2)}
						</AppText>
					</View>
					<View
						style={[styles.divider, { backgroundColor: theme.colors.border }]}
					/>
					<View style={styles.resultRow}>
						<AppText variant="caption">Each person pays</AppText>
						<AppText variant="heading" color={theme.colors.primary}>
							₦{perPerson.toFixed(2)}
						</AppText>
					</View>
				</View>
			)}
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
	stepperRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 24,
	},
	stepperBtn: {
		width: 48,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
	stepperDisplay: {
		flex: 1,
		height: 48,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		gap: 2,
	},
	resultCard: {
		borderWidth: 1,
		gap: 4,
		marginBottom: 32,
	},
	resultRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	divider: {
		height: 1,
		marginVertical: 8,
	},
});
