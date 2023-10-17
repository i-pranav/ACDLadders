import { ProblemStatus } from "./types";

const baseURL = "https://acodedaily.com/api/v2/";

export const constants = {
	cfAPI: 'https://codeforces.com/api',
	api: `${baseURL}`,
	submissionFetchInterval: 30 * 1000,
};

export const cfVerdictToStatusMap: Record<string, ProblemStatus> = {
	'OK': ProblemStatus.AC,
	'WRONG_ANSWER': ProblemStatus.WA,
	'COMPILATION_ERROR': ProblemStatus.CE,
	'RUNTIME_ERROR': ProblemStatus.RE,
	'MEMORY_LIMIT_EXCEEDED': ProblemStatus.MLE,
	'TIME_LIMIT_EXCEEDED': ProblemStatus.TLE,
}

export const problemStatusPriority: Record<ProblemStatus, number> = {
	[ProblemStatus.AC]: 3,
	[ProblemStatus.WA]: 2,
	[ProblemStatus.CE]: 2,
	[ProblemStatus.RE]: 2,
	[ProblemStatus.MLE]: 2,
	[ProblemStatus.TLE]: 2,
	[ProblemStatus.NOTAC]: 1,
	[ProblemStatus.NONE]: 0,
}

export const problemStatusColor: Record<ProblemStatus, string> = {
	[ProblemStatus.AC]: 'rgba(0, 255, 0, 0.5)',
	[ProblemStatus.WA]: 'rgba(255, 0, 0, 0.3)',
	[ProblemStatus.CE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.RE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.MLE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.TLE]: 'rgba(227, 214, 36, 0.3)',
	[ProblemStatus.NOTAC]: 'rgba(252, 119, 3, 0.3)',
	[ProblemStatus.NONE]: '#ffffff',
}

export const cfRankColor: Record<string, string> = {
	'newbie': '#CCCCCC',
	'pupil': '#77FF78',
	'specialist': '#77DDBB',
	'expert': '#ABAAFF',
	'candidate master': '#FF88FF',
	'master': '#FFCC88',
	'international master': '#FFBB55',
	'grandmaster': '#FF7777',
	'international grandmaster': '#FF3333',
	'legendary grandmaster': '#AA0001',
}

export const cfQuesColor: Record<number, string> = {
	800: '#CCCCCC',
	900: '#CCCCCC',
	1000: '#CCCCCC',
	1100: '#CCCCCC',

	1200: '#77FF78',
	1300: '#77FF78',

	1400: '#77DDBB',
	1500: '#77DDBB',

	1600: '#ABAAFF',
	1700: '#ABAAFF',
	1800: '#ABAAFF',

	1900: '#FF88FF',
	2000: '#FF88FF',

	2100: '#FFCC88',
	2200: '#FFCC88',

	2300: '#FFBB55',

	2400: '#FF7777',
	2500: '#FF7777',

	2600: '#FF3333',
	2700: '#FF3333',
	2800: '#FF3333',

	2900: '#FF0000',
	3000: '#FF0000',
	3100: '#FF0000',
	3200: '#FF0000',
	3300: '#FF0000',
	3400: '#FF0000',
	3500: '#FF0000',
}

export const index: Record<number, number> = {
	200: 0,
	300: 0,
	400: 0,
	500: 0,
	600: 0,
	700: 0,
	800: 0,
	900: 1,
	1000: 2,
	1100: 3,

	1200: 4,
	1300: 5,

	1400: 6,
	1500: 7,

	1600: 8,
	1700: 9,
	1800: 10,

	1900: 11,
	2000: 12,

	2100: 13,
	2200: 14,

	2300: 15,

	2400: 16,
	2500: 17,

	2600: 18,
	2700: 19,
	2800: 20,

	2900: 21,
	3000: 22,
	3100: 23,
	3200: 24,
	3300: 25,
	3400: 26,
	3500: 27,
}
