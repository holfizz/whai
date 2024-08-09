'use client'
import AuthProvider from '@/app/(providers)/AuthProvider'
import ErrorFallback from '@/shared/ui/ErrorFallback/ErrorFallback'
import { NextUIProvider } from '@nextui-org/react'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ApolloProviders } from '../(providers)/ApolloProvider'

export function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback as any}>
			<ApolloProviders>
				<NextUIProvider>
					<AuthProvider>{children}</AuthProvider>
				</NextUIProvider>
			</ApolloProviders>
		</ErrorBoundary>
	)
}
