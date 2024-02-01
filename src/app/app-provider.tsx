import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import TanstackProvider from '@/app/(providers)/TanstackProvider'

export function AppProvider({children}:{children:ReactNode}) {
  return <ThemeProvider
    themes={['app_dark_theme', 'app_light_theme']}
    attribute="class"
    defaultTheme="app_light_theme"
    disableTransitionOnChange
  >
    <TanstackProvider>
      {children}
    </TanstackProvider>
  </ThemeProvider>
}
