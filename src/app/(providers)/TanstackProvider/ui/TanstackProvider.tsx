'use client'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TanstackProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnReconnect: false,
				refetchOnMount: false,
				retry: 1,
				staleTime: 5 * 1000,
			},
		},
	})

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/*<ReactQueryDevtools initialIsOpen={false} />*/}
		</QueryClientProvider>
	)
}
export default TanstackProvider
