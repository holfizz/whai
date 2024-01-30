'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Suspense, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage'
import Sidebar from '@/widgets/Sidebar'
import Navbar from '@/widgets/Navbar'

export default function Body({
  children, className
}: {
	children: React.ReactNode,
	className?:string
}) {
  const { theme } = useTheme()
  const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || theme
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <body  className={classNames('app', {}, [defaultTheme, className])}>
      <Suspense fallback={null}>
        <Navbar />
        <div className={'app_wrapper'}>
          <div className={'asd'}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
          </div>
          <div className={classNames('content_wrapper', {['isCollapsed']: isCollapsed}, [])}>
            {children}
          </div>
        </div>
      </Suspense>
    </body>
  )
}
