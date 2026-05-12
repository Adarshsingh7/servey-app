import ApiClient from './ApiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/users`;

const adminClient = new ApiClient(API_BASE_URL);

export const getAllUsers = async (includeInactive = true) => {
	const token = localStorage.getItem('USER_TOKEN');
	const query = includeInactive ? '?includeInactive=true' : '';
	const { data, error } = await adminClient.get<any>(query, undefined, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return { data, error };
};

export const createUser = async (body: Partial<UserType>) => {
	const token = localStorage.getItem('USER_TOKEN');
	return await adminClient.post<UserType, Partial<UserType>>('/', body, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updateUser = async (id: string, body: Partial<UserType>) => {
	const token = localStorage.getItem('USER_TOKEN');
	return await adminClient.patch<UserType, Partial<UserType>>(`/${id}`, body, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updatePasswordByAdmin = async (userId: string, body: any) => {
	const token = localStorage.getItem('USER_TOKEN');
	return await adminClient.patch<any, any>(`/update-password-admin`, { ...body, userId }, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const deleteUser = async (id: string) => {
	const token = localStorage.getItem('USER_TOKEN');
	return await adminClient.delete(`/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

const globalAdminClient = new ApiClient(`${import.meta.env.VITE_API_URL}/api/admin`);

export const getGlobalStats = async () => {
	const token = localStorage.getItem('USER_TOKEN');
	return await globalAdminClient.get<any>('/stats', undefined, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
