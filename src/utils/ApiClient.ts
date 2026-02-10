import axios, {
	type AxiosInstance,
	AxiosError,
	type AxiosRequestConfig,
} from 'axios';

// types/api.ts
export interface ApiError {
	message: string;
	status: number | null;
	data: any | null;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T | null;
	error: ApiError | null;
}

// api/ApiClient.ts
export default class ApiClient {
	private client: AxiosInstance;

	constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
		this.client = axios.create({
			baseURL,
			headers: {
				'Content-Type': 'application/json',
				...defaultHeaders,
			},
			timeout: 15000,
		});
	}

	// ---------- Core Handler ----------
	private async handleRequest<T>(
		requestFn: () => Promise<any>,
	): Promise<ApiResponse<T>> {
		try {
			const response = await requestFn();
			return {
				success: true,
				data: response.data as T,
				error: null,
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				error: this.formatError(error),
			};
		}
	}

	// ---------- Error Formatter ----------
	private formatError(error: unknown): ApiError {
		const err = error as AxiosError<any>;

		if (err.response) {
			return {
				message:
					err.response.data?.message ||
					err.response.statusText ||
					'Request failed',
				status: err.response.status,
				data: err.response.data ?? null,
			};
		}

		if (err.request) {
			return {
				message: 'No response from server',
				status: null,
				data: null,
			};
		}

		return {
			message: err.message || 'Unexpected error',
			status: null,
			data: null,
		};
	}

	// ---------- HTTP METHODS ----------
	get<T>(
		url: string,
		params?: Record<string, any>,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		return this.handleRequest<T>(() =>
			this.client.get(url, { params, ...config }),
		);
	}

	post<T, B = unknown>(
		url: string,
		body?: B,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		return this.handleRequest<T>(() => this.client.post(url, body, config));
	}

	patch<T, B = unknown>(
		url: string,
		body?: B,
		config?: AxiosRequestConfig,
	): Promise<ApiResponse<T>> {
		return this.handleRequest<T>(() => this.client.patch(url, body, config));
	}

	delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
		return this.handleRequest<T>(() => this.client.delete(url, config));
	}
}
