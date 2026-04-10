import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "../context/ThemeContext";
import { TOOLS } from "../constants/tools";
import ScreenWrapper from "../components/ScreenWrapper";
import ToolCard from "../components/ToolCard";
import AppText from "../components/AppText";
import type { RootStackParamList } from "../types/navigation";
import type { Tool } from "../types/tools";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
	const navigation = useNavigation<NavigationProp>();
	const { theme } = useTheme();

	function handleToolPress(tool: Tool) {
		navigation.navigate(tool.route);
	}

	return (
		<ScreenWrapper>
			<View style={styles.header}>
				<AppText variant="heading">Smart Toolkit</AppText>
				<AppText variant="caption">Pick a tool to get started</AppText>
			</View>
			<FlatList
				data={TOOLS}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ToolCard tool={item} onPress={() => handleToolPress(item)} />
				)}
				contentContainerStyle={{
					paddingBottom: theme.spacing.xl,
				}}
				showsVerticalScrollIndicator={false}
			/>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingTop: 24,
		paddingBottom: 20,
		gap: 4,
	},
});
