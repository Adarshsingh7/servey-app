export const sanitizeString = (str: any): string => {
	if (typeof str !== 'string') return '';
	return str.trim();
};

export const isNonMeaningful = (str: any): boolean => {
	if (typeof str !== 'string') return !str;
	return str.trim().length === 0;
};
