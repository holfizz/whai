'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'
import { ApolloProviders } from '../(providers)/ApolloProvider'
export function AppProvider({ children }: { children: ReactNode }) {
	const [systemTheme, setSystemTheme] = useState<string | undefined>(undefined)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setSystemTheme('dark')
				console.log('dark')
			} else {
				setSystemTheme('light')
			}
		}
	}, [])

	return (
		<ApolloProviders>
			<NextUIProvider>
				<ThemeProvider
					themes={['dark', 'light']}
					attribute='class'
					disableTransitionOnChange
					defaultTheme={systemTheme && systemTheme}
					enableSystem={true}
				>
					{children}
				</ThemeProvider>
			</NextUIProvider>
		</ApolloProviders>
	)
}
