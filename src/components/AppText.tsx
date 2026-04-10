import React from "react";
import { Text, StyleSheet } from "react-native";
import type { TextProps, TextStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

type Variant = "heading" | "subheading" | "body" | "caption" | "label";

type Props = TextProps & {
	variant?: Variant;
	color?: string;
	align?: TextStyle["textAlign"];
};

export default function AppText({
	variant = "body",
	color,
	align,
	style,
	children,
	...rest
}: Props) {
	const { theme } = useTheme();

	const variantStyles: Record<Variant, TextStyle> = {
		heading: {
			fontSize: theme.fontSizes.xxl,
			fontWeight: theme.fontWeights.bold,
			color: theme.colors.text,
		},
		subheading: {
			fontSize: theme.fontSizes.lg,
			fontWeight: theme.fontWeights.semibold,
			color: theme.colors.text,
		},
		body: {
			fontSize: theme.fontSizes.md,
			fontWeight: theme.fontWeights.regular,
			color: theme.colors.text,
		},
		caption: {
			fontSize: theme.fontSizes.sm,
			fontWeight: theme.fontWeights.regular,
			color: theme.colors.textSecondary,
		},
		label: {
			fontSize: theme.fontSizes.sm,
			fontWeight: theme.fontWeights.medium,
			color: theme.colors.textSecondary,
		},
	};

	return (
		<Text
			style={[
				variantStyles[variant],
				color ? { color } : undefined,
				align ? { textAlign: align } : undefined,
				style,
			]}
			{...rest}
		>
			{children}
		</Text>
	);
}
