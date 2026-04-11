import React, { createContext, useCallback, useContext, useState } from "react";
import {
	COLORS,
	FONT_SIZES,
	FONT_WEIGHTS,
	RADIUS,
	SHADOWS,
	SPACING,
} from "../constants/theme";
import type { ThemeMode } from "../constants/theme";

type Theme = {
	colors: (typeof COLORS)["light" | "dark"];
	fontSizes: typeof FONT_SIZES;
	fontWeights: typeof FONT_WEIGHTS;
	spacing: typeof SPACING;
	radius: typeof RADIUS;
	shadows: (typeof SHADOWS)["light" | "dark"];
	mode: ThemeMode;
};

type ThemeContextValue = {
	theme: Theme;
	mode: ThemeMode;
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<ThemeMode>("light");
	const isDark = mode === "dark";

	const theme: Theme = {
		colors: COLORS[mode],
		fontSizes: FONT_SIZES,
		fontWeights: FONT_WEIGHTS,
		spacing: SPACING,
		radius: RADIUS,
		shadows: SHADOWS[mode],
		mode,
	};

	const toggleTheme = useCallback(() => {
		setMode((prev) => (prev === "light" ? "dark" : "light"));
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, mode, isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used inside ThemeProvider");
	}
	return context;
}
