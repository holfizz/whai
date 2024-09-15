'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { Suspense } from 'react'
import { AppProvider } from './app-provider'

export default function Body({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<body className={classNames('app', {}, [className])}>
			<AppProvider>
				<Suspense fallback={<BigDotsLoader />}>{children}</Suspense>
			</AppProvider>
		</body>
	)
}
