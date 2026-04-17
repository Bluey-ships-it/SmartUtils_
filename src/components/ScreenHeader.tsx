import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import AppText from "./AppText";

type Props = {
	title: string;
	rightSlot?: React.ReactNode;
	showBackButton?: boolean;
};

export default function ScreenHeader({
	title,
	rightSlot,
	showBackButton = false,
}: Props) {
	const { theme } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={styles.header}>
			{showBackButton ? (
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={[
						styles.btn,
						{
							backgroundColor: theme.colors.surface,
							borderColor: theme.colors.border,
							borderRadius: theme.radius.md,
						},
					]}
				>
					<Ionicons
						name="arrow-back-outline"
						size={20}
						color={theme.colors.text}
					/>
				</TouchableOpacity>
			) : (
				<View style={styles.btn} />
			)}

			<AppText variant="subheading">{title}</AppText>

			<View style={[styles.btn, styles.rightSlot]}>{rightSlot ?? null}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 16,
		paddingBottom: 24,
	},
	btn: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "transparent",
	},
	rightSlot: {
		borderWidth: 0,
	},
});
