import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyBuilder from './pages/survey-builder';
import { useMemo } from 'react';
import Preview from './pages/Preview';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SuccessPage from './pages/Preview/components/SuccessPage';
import FailurePage from './pages/Preview/components/FailurePage';
import AuthScreen from './pages/login/AuthScreen';
import Profile from './pages/profile';
import AuthWrapper from './components/AuthWrapper';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '/auth',
				element: <AuthScreen />,
			},
			{
				path: '',
				element: (
					<AuthWrapper>
						<Profile />
					</AuthWrapper>
				),
			},
			{
				path: '/edit/:id',
				element: (
					<AuthWrapper>
						<SurveyBuilder />
					</AuthWrapper>
				),
			},
			{
				path: '/create',
				element: (
					<AuthWrapper>
						<SurveyBuilder />
					</AuthWrapper>
				),
			},
			{
				path: '/preview/:id',
				element: (
					<AuthWrapper>
						<Preview />
					</AuthWrapper>
				),
			},
			{
				path: '/preview/:id/success',
				element: (
					<AuthWrapper>
						<SuccessPage />
					</AuthWrapper>
				),
			},
			{
				path: '/preview/:id/failure',
				element: <FailurePage />,
			},
			{
				path: 'profile',
				element: (
					<AuthWrapper>
						<Profile />
					</AuthWrapper>
				),
			},
		],
	},
]);

function App() {
	const routerProvider = useMemo(() => <RouterProvider router={router} />, []);

	return (
		<div>
			<Toaster
				richColors
				theme='light'
			/>
			<QueryClientProvider client={queryClient}>
				{routerProvider}
			</QueryClientProvider>
		</div>
	);
}
export default App;
