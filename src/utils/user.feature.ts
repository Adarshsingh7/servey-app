import axios from 'axios';
import ApiClient from './ApiClient';

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/user`;

const authClient = new ApiClient(API_BASE_URL);

interface AuthResponse {
	token: string;
	user: UserType;
}

interface GoogleAuthBody {
	credential: string;
	role?: UserType['role'];
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

export const googleAuth = async (body: GoogleAuthBody) =>
	await authClient.post<AuthResponse, GoogleAuthBody>('/google', body);
