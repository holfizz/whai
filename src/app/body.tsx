'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

export default function Body({
  children, className
}: {
	children: React.ReactNode,
	className?:string
}) {
  const { theme } = useTheme()
  const localStorage = window.localStorage
  const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) || theme

  return (
    <body  className={classNames('app', {}, [defaultTheme, className])}>
      {children}
    </body>
  )
}
