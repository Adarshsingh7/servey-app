import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyBuilder from './pages/survey-builder';
import { useMemo } from 'react';
import Preview from './pages/Preview';
import { Toaster } from '@/components/ui/sonner';

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
			{routerProvider}
		</div>
	);
}
export default App;
