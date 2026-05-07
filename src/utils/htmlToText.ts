export function htmlToText(input: string): string {
	if (!input) return '';

	// Fast-path: not HTML-ish
	if (!/[<>]/.test(input)) return input;

	try {
		const doc = new DOMParser().parseFromString(input, 'text/html');
		const text = doc.body?.textContent ?? '';
		return text.replace(/\s+/g, ' ').trim();
	} catch {
		// Fallback: strip tags roughly
		return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	}
}

