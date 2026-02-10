import { useGetAuthUser } from '@/queries/auth.query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthWrapper({ children }: { children: React.ReactNode }) {
	const { data, isFetched } = useGetAuthUser();
	const authUser = data?.user;
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!authUser && isFetched) navigate('/auth');
	}, [authUser, navigate, isFetched]);

	return <>{children}</>;
}

export default AuthWrapper;
