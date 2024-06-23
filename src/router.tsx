import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './app';
import {useMemo} from 'react';
import {DashboardPage} from "./pages/dashboard.page";
import {ReleasePage} from "./pages/releasePage";

export function Router() {

	const resolveRouter = useMemo(() => createBrowserRouter([
		{
			path: '/', element: <App />,
			children: [
				{path: '/', element: <DashboardPage />},
				{path: '/release/:id', element: <ReleasePage/>}
			]
		}
	]), []);

	return <RouterProvider router={resolveRouter} />;
}
