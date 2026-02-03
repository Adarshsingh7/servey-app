import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/response';

export interface ResponseComponent {
	questionId: string;
	answer: string;
}

export interface SurveyResponseType {
	surveyId: string;
	components: ResponseComponent[];
}

const responseApi = {
	create: async (
		response: SurveyResponseType,
	): Promise<ApiResponse<SurveyResponseType>> => {
		try {
			const res = await axios.post<{
				data: SurveyResponseType;
				status: string;
			}>(API_BASE_URL, response);
			return { success: true, error: null, data: res.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	getAll: async (): Promise<ApiResponse<SurveyResponseType[]>> => {
		try {
			const response = await axios.get<{
				data: SurveyResponseType[];
				status: string;
			}>(API_BASE_URL);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	getById: async (id: string): Promise<ApiResponse<SurveyResponseType>> => {
		try {
			const response = await axios.get<{
				data: SurveyResponseType;
				status: string;
			}>(`${API_BASE_URL}/${id}`);
			return { success: true, error: null, data: response.data.data };
		} catch (error) {
			return { success: false, error: getErrorMessage(error), data: null };
		}
	},

	update: async (
		id: string,
		response: SurveyResponseType,
	): Promise<ApiResponse<SurveyResponseType>> => {
		try {
			const res = await axios.patch<{
				data: SurveyResponseType;
				status: string;
			}>(`${API_BASE_URL}/${id}`, response);
			return { success: true, error: null, data: res.data.data };
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

export default responseApi;
