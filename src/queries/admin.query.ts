import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as adminApi from '@/utils/admin.feature';
import { toast } from 'sonner';

export const useGetAllUsers = () => {
	return useQuery({
		queryKey: ['all_users'],
		queryFn: () => adminApi.getAllUsers(),
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (body: Partial<UserType>) => adminApi.createUser(body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all_users'] });
			toast.success('User created successfully');
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to create user');
		},
	});
};

export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: Partial<UserType> }) =>
			adminApi.updateUser(id, body),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all_users'] });
			toast.success('User updated successfully');
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to update user');
		},
	});
};

export const useUpdatePasswordByAdmin = () => {
	return useMutation({
		mutationFn: ({ userId, body }: { userId: string; body: any }) =>
			adminApi.updatePasswordByAdmin(userId, body),
		onSuccess: () => {
			toast.success('Password updated successfully');
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to update password');
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => adminApi.deleteUser(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['all_users'] });
			toast.success('User deleted successfully');
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to delete user');
		},
	});
};

export const useGetGlobalStats = () => {
	return useQuery({
		queryKey: ['global_stats'],
		queryFn: () => adminApi.getGlobalStats(),
	});
};
