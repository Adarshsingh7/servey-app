import ApiClient from './ApiClient';
import type { ApiResponse } from './ApiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/response`;

const responseApiClient = new ApiClient(API_BASE_URL);

export interface ResponseComponent {
	questionId: string;
	answer: string;
}

export interface SurveyResponseType {
	email?: string;
	surveyId: string;
	components: ResponseComponent[];
}

/**
 * responseApi
 * Core service for survey response management with token-based authentication.
 */
const responseApi = {
	create: async (
		response: SurveyResponseType,
	): Promise<ApiResponse<SurveyResponseType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await responseApiClient.post<SurveyResponseType, SurveyResponseType>(
			'/',
			response,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);
	},

	getAll: async (
		params?: Record<string, string | number | boolean>,
		queryString?: string,
	): Promise<ApiResponse<SurveyResponseType[]>> => {
		const token = localStorage.getItem('USER_TOKEN');
		const url = queryString ? `/${queryString}` : '/';
		return await responseApiClient.get<SurveyResponseType[]>(url, params, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	getById: async (id: string): Promise<ApiResponse<SurveyResponseType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await responseApiClient.get<SurveyResponseType>(`/${id}`, undefined, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	update: async (
		id: string,
		response: SurveyResponseType,
	): Promise<ApiResponse<SurveyResponseType>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await responseApiClient.patch<
			SurveyResponseType,
			SurveyResponseType
		>(`/${id}`, response, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},

	delete: async (id: string): Promise<ApiResponse<void>> => {
		const token = localStorage.getItem('USER_TOKEN');
		return await responseApiClient.delete(`/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	},
};

export { responseApiClient };
export default responseApi;
