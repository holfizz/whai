'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense, useState } from 'react'
import Sidebar from '@/widgets/Sidebar'
import Navbar from '@/widgets/Navbar'
import { AppProvider } from '@/app/app-provider'

export default function Body({
  children, className
}: {
	children: React.ReactNode,
	className?:string
}) {

  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <body  className={classNames('app', {}, [ className])}>
      <AppProvider>
        <Suspense fallback={null}>
          <Navbar />
          <div className={'app_wrapper'}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={classNames('content_wrapper', { ['isCollapsed']: isCollapsed }, [])}>
              {children}
            </div>
          </div>
        </Suspense>
      </AppProvider>
    </body>
  )
}
