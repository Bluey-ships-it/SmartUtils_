import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";

export type FilterType = "all" | "active" | "completed";

const FILTERS: { key: FilterType; label: string }[] = [
	{ key: "all", label: "All" },
	{ key: "active", label: "Active" },
	{ key: "completed", label: "Completed" },
];

type Props = {
	active: FilterType;
	onChange: (filter: FilterType) => void;
	counts: Record<FilterType, number>;
};

export default function TaskFilter({ active, onChange, counts }: Props) {
	const { theme } = useTheme();

	return (
		<View style={styles.container}>
			{FILTERS.map((f) => {
				const isActive = f.key === active;
				return (
					<TouchableOpacity
						key={f.key}
						onPress={() => onChange(f.key)}
						style={[
							styles.tab,
							{
								backgroundColor: isActive
									? theme.colors.primary
									: theme.colors.surface,
								borderColor: isActive
									? theme.colors.primary
									: theme.colors.border,
								borderRadius: theme.radius.full,
							},
						]}
					>
						<AppText
							variant="label"
							color={
								isActive
									? theme.colors.textOnPrimary
									: theme.colors.textSecondary
							}
						>
							{f.label}
						</AppText>
						<View
							style={[
								styles.badge,
								{
									backgroundColor: isActive
										? "rgba(255,255,255,0.25)"
										: theme.colors.surfaceSecondary,
								},
							]}
						>
							<AppText
								variant="caption"
								color={
									isActive ? theme.colors.textOnPrimary : theme.colors.textMuted
								}
							>
								{counts[f.key]}
							</AppText>
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 20,
	},
	tab: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderWidth: 1,
	},
	badge: {
		borderRadius: 999,
		paddingHorizontal: 6,
		paddingVertical: 2,
		minWidth: 20,
		alignItems: "center",
	},
});
