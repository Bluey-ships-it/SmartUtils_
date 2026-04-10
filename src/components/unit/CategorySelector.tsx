import React from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { UNIT_CATEGORIES } from "../../constants/units";
import type { UnitCategory } from "../../types/converter";

type Props = {
	selected: UnitCategory;
	onChange: (category: UnitCategory) => void;
};

export default function CategorySelector({ selected, onChange }: Props) {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			<AppText variant="label" style={styles.sectionLabel}>
				Category
			</AppText>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				{UNIT_CATEGORIES.map((category) => {
					const active = category.value === selected.value;
					return (
						<TouchableOpacity
							key={category.value}
							onPress={() => onChange(category)}
							style={[
								styles.chip,
								{
									backgroundColor: active
										? theme.colors.primary
										: theme.colors.surface,
									borderColor: active
										? theme.colors.primary
										: theme.colors.border,
									borderRadius: theme.radius.full,
								},
							]}
						>
							<AppText
								variant="label"
								color={active ? theme.colors.textOnPrimary : theme.colors.text}
							>
								{category.label}
							</AppText>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
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
	scrollContent: {
		gap: 8,
		paddingRight: 16,
	},
	chip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderWidth: 1,
	},
});
