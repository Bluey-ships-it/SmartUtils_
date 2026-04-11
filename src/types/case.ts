export type CaseType = {
	key: string;
	label: string;
	convert: (text: string) => string;
};
