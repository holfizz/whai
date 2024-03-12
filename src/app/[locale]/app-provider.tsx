'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ApolloProviders } from '../(providers)/ApolloProvider'

export function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ApolloProviders>
			<ThemeProvider
				themes={['dark', 'light']}
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</ApolloProviders>
	)
}
