import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { CASE_TYPES } from "../../constants/case";

export default function CaseConverterTab() {
	const { theme } = useTheme();
	const [text, setText] = useState("");
	const [activeCase, setActiveCase] = useState<string>("upper");
	const [copied, setCopied] = useState(false);

	const selectedCase = CASE_TYPES.find((c) => c.key === activeCase)!;
	const result = text.trim() !== "" ? selectedCase.convert(text) : "";

	async function handleCopy() {
		if (!result) return;
		await Clipboard.setStringAsync(result);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<View>
			{/* Input */}
			<AppText variant="label" style={styles.sectionLabel}>
				Enter text
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
					value={text}
					onChangeText={setText}
					multiline
					placeholder="Type text to convert..."
					placeholderTextColor={theme.colors.textMuted}
					style={[
						styles.input,
						{
							color: theme.colors.text,
							fontSize: theme.fontSizes.md,
						},
					]}
				/>
			</View>

			{/* Case Type Selector */}
			<AppText variant="label" style={styles.sectionLabel}>
				Select case
			</AppText>
			<View style={styles.caseGrid}>
				{CASE_TYPES.map((caseType) => {
					const active = caseType.key === activeCase;
					return (
						<TouchableOpacity
							key={caseType.key}
							onPress={() => setActiveCase(caseType.key)}
							style={[
								styles.caseBtn,
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
								{caseType.label}
							</AppText>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Result */}
			{result !== "" && (
				<View
					style={[
						styles.resultCard,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.lg,
							padding: theme.spacing.md,
						},
					]}
				>
					<View style={styles.resultHeader}>
						<AppText variant="label" color={theme.colors.textMuted}>
							Result
						</AppText>
						<TouchableOpacity
							onPress={handleCopy}
							style={[
								styles.copyBtn,
								{
									backgroundColor: copied
										? theme.colors.successLight
										: theme.colors.primaryLight,
									borderRadius: theme.radius.md,
									borderColor: copied
										? theme.colors.success
										: theme.colors.primary,
								},
							]}
						>
							<Ionicons
								name={copied ? "checkmark-outline" : "copy-outline"}
								size={14}
								color={copied ? theme.colors.success : theme.colors.primary}
							/>
							<AppText
								variant="caption"
								color={copied ? theme.colors.success : theme.colors.primary}
							>
								{copied ? "Copied!" : "Copy"}
							</AppText>
						</TouchableOpacity>
					</View>
					<AppText variant="body" style={styles.resultText}>
						{result}
					</AppText>
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
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
		marginBottom: 24,
		minHeight: 120,
	},
	input: {
		flex: 1,
		textAlignVertical: "top",
		minHeight: 100,
		lineHeight: 22,
	},
	caseGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: 24,
	},
	caseBtn: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderWidth: 1,
	},
	resultCard: {
		borderWidth: 1,
		gap: 12,
		marginBottom: 32,
	},
	resultHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	copyBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderWidth: 1,
	},
	resultText: {
		lineHeight: 24,
	},
});
