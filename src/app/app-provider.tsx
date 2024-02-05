import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import TanstackProvider from './(providers)/TanstackProvider'
import AuthProvider from './(providers)/AuthProvider'

export function AppProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider
			themes={['app_dark_theme', 'app_light_theme']}
			attribute='class'
			defaultTheme='app_light_theme'
			disableTransitionOnChange
		>
			<AuthProvider>
				<TanstackProvider>{children}</TanstackProvider>
			</AuthProvider>
		</ThemeProvider>
	)
}
