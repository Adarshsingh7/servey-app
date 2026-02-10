import { isAuth } from '@/utils/user.feature';
import { useQuery } from '@tanstack/react-query';

export const userQueryAuth = () => ({
	queryKey: ['auth_user'],
	queryFn: () => isAuth(),
});

export const useGetAuthUser = () =>
	useQuery({
		queryKey: ['auth_user'],
		queryFn: () => isAuth(),
	});
