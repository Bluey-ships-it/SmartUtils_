export const COLORS = {
	light: {
		primary: "#2563EB",
		primaryLight: "#EFF6FF",
		primaryDark: "#1D4ED8",

		background: "#F8FAFC",
		surface: "#FFFFFF",
		surfaceSecondary: "#F1F5F9",

		text: "#0F172A",
		textSecondary: "#475569",
		textMuted: "#94A3B8",
		textOnPrimary: "#FFFFFF",

		border: "#E2E8F0",
		borderFocus: "#2563EB",

		success: "#16A34A",
		successLight: "#F0FDF4",
		error: "#DC2626",
		errorLight: "#FEF2F2",
		warning: "#D97706",
		warningLight: "#FFFBEB",
	},
	dark: {
		primary: "#3B82F6",
		primaryLight: "#1E3A5F",
		primaryDark: "#2563EB",

		background: "#0F172A",
		surface: "#1E293B",
		surfaceSecondary: "#334155",

		text: "#F8FAFC",
		textSecondary: "#CBD5E1",
		textMuted: "#64748B",
		textOnPrimary: "#FFFFFF",

		border: "#334155",
		borderFocus: "#3B82F6",

		success: "#22C55E",
		successLight: "#052E16",
		error: "#EF4444",
		errorLight: "#450A0A",
		warning: "#F59E0B",
		warningLight: "#451A03",
	},
} as const;

export const FONT_SIZES = {
	xs: 11,
	sm: 13,
	md: 15,
	lg: 17,
	xl: 20,
	xxl: 24,
	xxxl: 30,
} as const;

export const FONT_WEIGHTS = {
	regular: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
} as const;

export const SPACING = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
	xxl: 48,
} as const;

export const RADIUS = {
	sm: 6,
	md: 12,
	lg: 16,
	xl: 24,
	full: 999,
} as const;

export const SHADOWS = {
	light: {
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			elevation: 1,
		},
		md: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.08,
			shadowRadius: 6,
			elevation: 3,
		},
		lg: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.12,
			shadowRadius: 12,
			elevation: 6,
		},
	},
	dark: {
		sm: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.3,
			shadowRadius: 2,
			elevation: 1,
		},
		md: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.4,
			shadowRadius: 6,
			elevation: 3,
		},
		lg: {
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.5,
			shadowRadius: 12,
			elevation: 6,
		},
	},
} as const;

export type ColorScheme = (typeof COLORS)["light" | "dark"];
export type ThemeMode = "light" | "dark";
