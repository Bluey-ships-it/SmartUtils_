import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

const TIP_PRESETS = [10, 15, 20, 25];

export default function TipCalculatorTab() {
	const { theme } = useTheme();
	const [bill, setBill] = useState("");
	const [tipPercent, setTipPercent] = useState<number>(15);
	const [people, setPeople] = useState("1");

	const billAmount = parseFloat(bill) || 0;
	const numPeople = parseInt(people) || 1;
	const tipAmount = (billAmount * tipPercent) / 100;
	const total = billAmount + tipAmount;
	const perPerson = total / numPeople;

	const isValid = billAmount > 0;

	return (
		<View>
			{/* Bill Amount */}
			<AppText variant="label" style={styles.sectionLabel}>
				Bill amount
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

			{/* Tip Presets */}
			<AppText variant="label" style={styles.sectionLabel}>
				Tip percentage
			</AppText>
			<View style={styles.presetRow}>
				{TIP_PRESETS.map((preset) => {
					const active = preset === tipPercent;
					return (
						<TouchableOpacity
							key={preset}
							onPress={() => setTipPercent(preset)}
							style={[
								styles.presetBtn,
								{
									backgroundColor: active
										? theme.colors.primary
										: theme.colors.surface,
									borderColor: active
										? theme.colors.primary
										: theme.colors.border,
									borderRadius: theme.radius.md,
								},
							]}
						>
							<AppText
								variant="label"
								color={active ? theme.colors.textOnPrimary : theme.colors.text}
							>
								{preset}%
							</AppText>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Number of People */}
			<AppText variant="label" style={styles.sectionLabel}>
				Number of people
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
						<AppText variant="caption">Tip amount</AppText>
						<AppText variant="body" color={theme.colors.primary}>
							₦{tipAmount.toFixed(2)}
						</AppText>
					</View>
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
						<AppText variant="caption">Per person</AppText>
						<AppText variant="subheading" color={theme.colors.primary}>
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
	presetRow: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 24,
	},
	presetBtn: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		borderWidth: 1,
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
