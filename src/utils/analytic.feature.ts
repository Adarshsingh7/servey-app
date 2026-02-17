import ApiClient from './ApiClient';

const analyticApiClient = new ApiClient(
	`${import.meta.env.VITE_API_URL}/api/response`,
);

export { analyticApiClient };
