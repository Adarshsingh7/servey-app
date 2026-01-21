import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SurveyBuilder from './pages/survey-builder';
import { useMemo } from 'react';
import Preview from './pages/Preview';
import { demoSurvey } from './pages/Preview/servey';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <SurveyBuilder />,
			},
			{
				path: '/preview',
				element: <Preview survey={demoSurvey} />,
			},
		],
	},
]);

function App() {
	const routerProvider = useMemo(() => <RouterProvider router={router} />, []);

	return <div>{routerProvider}</div>;
}
export default App;
