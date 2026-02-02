import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/survey';

export interface Question {
	id?: string;
	text: string;
	type: 'text' | 'multiple-choice' | 'rating';
	options?: string[];
}

export interface ApiResponse<T> {
	success: boolean;
	error: string | null;
	data: T | null;
}

const surveyApi = {
	create: async (survey: SurveyType): Promise<ApiResponse<SurveyType>> => {
		try {
			const response = await axios.post<{ data: SurveyType; status: string }>(
				API_BASE_URL,
				survey,
			);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	getAll: async (): Promise<ApiResponse<SurveyType[]>> => {
		try {
			const response = await axios.get<{ data: SurveyType[]; status: string }>(
				API_BASE_URL,
			);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	getById: async (id: string): Promise<ApiResponse<SurveyType>> => {
		try {
			const response = await axios.get<{ data: SurveyType; status: string }>(
				`${API_BASE_URL}/${id}`,
			);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	update: async (
		id: string,
		survey: SurveyType,
	): Promise<ApiResponse<SurveyType>> => {
		try {
			const response = await axios.patch<{ data: SurveyType; status: string }>(
				`${API_BASE_URL}/${id}`,
				survey,
			);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	delete: async (id: string): Promise<ApiResponse<void>> => {
		try {
			await axios.delete(`${API_BASE_URL}/${id}`);
			return { success: true, error: null, data: null };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},
};

const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message || error.message;
	}
	return error instanceof Error ? error.message : 'An unknown error occurred';
};

export default surveyApi;
