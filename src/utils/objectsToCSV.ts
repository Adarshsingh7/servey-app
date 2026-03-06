function objectsToCSV<T extends Record<string, any>>(data: T[]): string {
	if (!data.length) return '';

	const headers = Object.keys(data[0]);

	const csvRows = [
		headers.join(','),
		...data.map((row) =>
			headers.map((field) => JSON.stringify(row[field] ?? '')).join(','),
		),
	];

	return csvRows.join('\n');
}

export { objectsToCSV };
