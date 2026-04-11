export type CountdownState = "idle" | "running" | "paused" | "finished";

export const PRESETS = [
	{ label: "1 min", seconds: 60 },
	{ label: "5 min", seconds: 300 },
	{ label: "10 min", seconds: 600 },
	{ label: "25 min", seconds: 1500 },
];

export function formatCountdown(seconds: number): {
	hours: string;
	minutes: string;
	seconds: string;
} {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;

	return {
		hours: String(h).padStart(2, "0"),
		minutes: String(m).padStart(2, "0"),
		seconds: String(s).padStart(2, "0"),
	};
}
