'use client'
import { type FC, type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage'


interface ThemeProviderProps {
  initialTheme?: Theme;
}
const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  initialTheme,
}) => {

  const {theme:Theme} = useTheme()
  const [theme, setTheme] = useState<Theme>()

  useEffect(() => {
    setTheme(initialTheme || (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme)
  }, [initialTheme, Theme])

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  )
  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
