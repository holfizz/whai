'use client'
import AuthProvider from '@/app/(providers)/AuthProvider'
import ErrorFallback from '@/shared/ui/ErrorFallback/ErrorFallback'
import { NextUIProvider } from '@nextui-org/react'
import { useWindowSize } from '@react-hook/window-size'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ApolloProviders } from '../(providers)/ApolloProvider'

export function AppProvider({ children }: { children: ReactNode }) {
	const [width] = useWindowSize()
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback as any}>
			<ApolloProviders>
				<NextUIProvider
					disableRipple
					skipFramerMotionAnimations
					disableAnimation={width <= 768}
				>
					<AuthProvider>{children}</AuthProvider>
				</NextUIProvider>
			</ApolloProviders>
		</ErrorBoundary>
	)
}
