import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
	children: React.ReactNode;
	padded?: boolean;
};

export default function ScreenWrapper({ children, padded = true }: Props) {
	const { theme, isDark } = useTheme();

	return (
		<SafeAreaView
			style={[styles.safe, { backgroundColor: theme.colors.background }]}
		>
			<StatusBar
				barStyle={isDark ? "light-content" : "dark-content"}
				backgroundColor={theme.colors.background}
			/>
			<View
				style={[
					styles.content,
					padded && { paddingHorizontal: theme.spacing.md },
				]}
			>
				{children}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
});
