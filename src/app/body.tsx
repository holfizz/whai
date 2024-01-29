'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useEffect, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage'
import Navbar from '@/widgets/Navbar'
import Sidebar from '@/widgets/Sidebar/ui/Sidebar/Sidebar'

export default function Body({
  children, className
}: {
	children: React.ReactNode,
	className?:string
}) {
  const { theme } = useTheme()
  const [defaultTheme, setDefaultTheme] = useState('')
  useEffect(() => {
    if (typeof window === undefined) return
    const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)
	  setDefaultTheme(localStorageTheme || theme)
  }, [theme])
  const [isCollapsed, setIsCollapsed] = useState(true)
  return (
    <body  className={classNames('app', {}, [defaultTheme, className])}>
      <Navbar />
      <div className={'app_wrapper'}>
        <div className={'asd'}>
          <Sidebar setIsCollapsed={setIsCollapsed}/>
        </div>
        <div className={classNames('content_wrapper', {['isCollapsed']: isCollapsed}, [])}>
          {children}
        </div>
      </div>
    </body>
  )
}
