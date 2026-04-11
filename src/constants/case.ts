import { CaseType } from "../types/case";
export const CASE_TYPES: CaseType[] = [
	{
		key: "upper",
		label: "UPPER CASE",
		convert: (t) => t.toUpperCase(),
	},
	{
		key: "lower",
		label: "lower case",
		convert: (t) => t.toLowerCase(),
	},
	{
		key: "title",
		label: "Title Case",
		convert: (t) =>
			t.replace(
				/\w\S*/g,
				(w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
			),
	},
	{
		key: "sentence",
		label: "Sentence case",
		convert: (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase(),
	},
	{
		key: "camel",
		label: "camelCase",
		convert: (t) =>
			t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
	},
	{
		key: "snake",
		label: "snake_case",
		convert: (t) => t.toLowerCase().replace(/\s+/g, "_"),
	},
	{
		key: "kebab",
		label: "kebab-case",
		convert: (t) => t.toLowerCase().replace(/\s+/g, "-"),
	},
];
