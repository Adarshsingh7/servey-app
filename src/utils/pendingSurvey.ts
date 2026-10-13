const KEY = 'FORMLAB_PENDING_SURVEY';

export function savePendingSurvey(survey: SurveyType): void {
	try {
		localStorage.setItem(KEY, JSON.stringify(survey));
	} catch {
		// storage unavailable — fail silently
	}
}

export function loadPendingSurvey(): SurveyType | null {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return null;
		return JSON.parse(raw) as SurveyType;
	} catch {
		return null;
	}
}

export function clearPendingSurvey(): void {
	try {
		localStorage.removeItem(KEY);
	} catch {
		// ignore
	}
}

export function hasPendingSurvey(): boolean {
	try {
		return !!localStorage.getItem(KEY);
	} catch {
		return false;
	}
}
