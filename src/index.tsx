import {createRoot} from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Router} from './router';
import {CSSVariablesResolver, MantineProvider} from '@mantine/core';

const domNode = document.getElementById('root');

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 1000 * 15
		}
	}
});

const resolver: CSSVariablesResolver = (theme) => ({
	variables: {},
	light: {},
	dark: {
		'--mantine-color-violet-outline': theme.colors.violet[5],
		'--mantine-color-violet-light': theme.colors.violet[5],
		'--mantine-color-violet-light-color': theme.colors.violet[5],
	},
});


createRoot(domNode as Element).render(
		<MantineProvider defaultColorScheme='auto' cssVariablesResolver={resolver}>
			<QueryClientProvider client={queryClient}>
				<Router/>
			</QueryClientProvider>
		</MantineProvider>
);
