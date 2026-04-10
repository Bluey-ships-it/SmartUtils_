import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 8,
	},
	group: {
		flex: 1,
	},
	label: {
		marginBottom: 8,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		paddingVertical: 14,
	},
});
