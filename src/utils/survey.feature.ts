import ApiClient from './ApiClient';
import type { ApiResponse } from './ApiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/survey`;

const surveyApiClient = new ApiClient(API_BASE_URL);

/**
 * surveyApi
 * Core service for survey management with token-based authentication.
 */
const surveyApi = {
	create: async (survey: SurveyType): Promise<ApiResponse<SurveyType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await surveyApiClient.post<SurveyType, SurveyType>('/', survey, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	getAll: async (): Promise<ApiResponse<SurveyType[]>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await surveyApiClient.get<SurveyType[]>('/', undefined, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	getById: async (id: string): Promise<ApiResponse<SurveyType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await surveyApiClient.get<SurveyType>(`/${id}`, undefined, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update: async (
		id: string,
		survey: SurveyType,
	): Promise<ApiResponse<SurveyType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await surveyApiClient.patch<SurveyType, SurveyType>(
			`/${id}`,
			survey,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
	},

	delete: async (id: string): Promise<ApiResponse<void>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await surveyApiClient.delete(`/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export { surveyApiClient };
export default surveyApi;
