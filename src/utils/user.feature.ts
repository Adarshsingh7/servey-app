import axios from 'axios';
import ApiClient from './ApiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/user`;

const authClient = new ApiClient(API_BASE_URL);

interface AuthResponse {
	token: string;
	user: UserType;
}

export const login = async (body: Partial<UserType>) =>
	await authClient.post<AuthResponse, Partial<UserType>>('/login', body);

export const isAuth = async () => {
	const token = localStorage.getItem('USER_TOKEN');
	if (!token) return null;
	const { data, error } = await authClient.get<AuthResponse>('/me', undefined, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return data;
};

export const signup = async (body: Partial<UserType>) =>
	await authClient.post<AuthResponse, Partial<UserType>>('/signup', body);
