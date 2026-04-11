import React from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import AppText from "./AppText";

export type Tab = {
	key: string;
	label: string;
};

type Props = {
	tabs: Tab[];
	activeKey: string;
	onChange: (key: string) => void;
};

export default function UtilityTabs({ tabs, activeKey, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<View style={styles.wrapper}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{tabs.map((tab) => {
					const active = tab.key === activeKey;
					return (
						<TouchableOpacity
							key={tab.key}
							onPress={() => onChange(tab.key)}
							style={[
								styles.tab,
								{
									borderBottomWidth: 2,
									borderBottomColor: active
										? theme.colors.primary
										: "transparent",
									paddingBottom: 10,
								},
							]}
						>
							<AppText
								variant="label"
								color={active ? theme.colors.primary : theme.colors.textMuted}
							>
								{tab.label}
							</AppText>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
			<View
				style={[styles.underline, { backgroundColor: theme.colors.border }]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 24,
	},
	scrollContent: {
		gap: 8,
		paddingHorizontal: 2,
	},
	tab: {
		paddingHorizontal: 16,
	},
	underline: {
		height: 1,
		marginTop: -1,
	},
});
