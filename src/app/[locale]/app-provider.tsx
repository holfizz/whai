'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ApolloProviders } from '../(providers)/ApolloProvider'
import AuthProvider from '../(providers)/AuthProvider'
import TanstackProvider from '../(providers)/TanstackProvider'

export function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ApolloProviders>
			<ThemeProvider
				themes={['dark', 'light']}
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
			>
				<AuthProvider>
					<TanstackProvider>{children}</TanstackProvider>
				</AuthProvider>
			</ThemeProvider>
		</ApolloProviders>
	)
}
