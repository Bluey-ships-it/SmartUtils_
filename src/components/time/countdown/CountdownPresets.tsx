import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import AppText from "../../AppText";
import { PRESETS } from "../../../utils/countdown";

type Props = {
	selected: number;
	onChange: (seconds: number) => void;
};

export default function CountdownPresets({ selected, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<AppText variant="label" style={styles.sectionLabel}>
				Quick presets
			</AppText>
			<View style={styles.presetRow}>
				{PRESETS.map((preset) => {
					const active = preset.seconds === selected;
					return (
						<TouchableOpacity
							key={preset.label}
							onPress={() => onChange(preset.seconds)}
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
								{preset.label}
							</AppText>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 32,
	},
	sectionLabel: {
		marginBottom: 8,
	},
	presetRow: {
		flexDirection: "row",
		gap: 10,
	},
	presetBtn: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 12,
		borderWidth: 1,
	},
});
