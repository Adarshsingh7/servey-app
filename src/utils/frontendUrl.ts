export function getFrontendBaseUrl() {
	const configuredUrl = import.meta.env.VITE_FRONTEND_URL?.trim();

	if (configuredUrl) {
		try {
			return new URL(configuredUrl, window.location.origin).origin;
		} catch {
			return configuredUrl.replace(/\/+$/, '');
		}
	}

	return window.location.origin;
}

export function getSurveyPreviewUrl(id: string | null | undefined) {
	return `${getFrontendBaseUrl()}/preview/${id ?? ''}`;
}
