import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		marginTop: 24,
	},
	bmiValueRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	bmiNumber: {
		fontSize: 48,
		lineHeight: 56,
	},
	badge: {
		alignSelf: "flex-start",
	},
	scaleWrapper: {
		position: "relative",
		marginBottom: 8,
		height: 20,
		justifyContent: "center",
	},
	scaleBar: {
		flexDirection: "row",
		height: 8,
		overflow: "hidden",
	},
	scaleSegment: {
		flex: 1,
	},
	scaleIndicator: {
		position: "absolute",
		width: 16,
		height: 16,
		borderRadius: 8,
		borderWidth: 2.5,
		marginLeft: -8,
		top: 2,
	},
	scaleLabels: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	rangeNote: {
		marginTop: 12,
	},
});
