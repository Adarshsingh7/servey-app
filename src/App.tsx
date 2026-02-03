import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyBuilder from './pages/survey-builder';
import { useMemo } from 'react';
import Preview from './pages/Preview';
import { Toaster } from '@/components/ui/sonner';
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query';
import SuccessPage from './pages/Preview/components/SuccessPage';
import FailurePage from './pages/Preview/components/FailurePage';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <SurveyBuilder />,
			},
			{
				path: '/preview/:id',
				element: <Preview />,
			},
			{
				path: '/preview/:id/success',
				element: <SuccessPage />,
			},
			{
				path: '/preview/:id/failure',
				element: <FailurePage />,
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
