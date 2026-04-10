import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import AppText from "../AppText";
import { styles } from "./BMIHeader.styles";

export default function BMIHeader() {
	const { theme } = useTheme();
	const navigation = useNavigation();

	return (
		<View style={styles.header}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={[
					styles.backBtn,
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
			<AppText variant="subheading">BMI Calculator</AppText>
			<View style={styles.placeholder} />
		</View>
	);
}
