'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import AuthProvider from '../(providers)/AuthProvider'
import TanstackProvider from '../(providers)/TanstackProvider'

export function AppProvider({
	children,
	locale,
}: {
	children: ReactNode
	locale: string
}) {
	// const messages = useMessages()
	console.log(locale)

	return (
		<>
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
		</>
	)
}
