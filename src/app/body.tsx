'use client'
import { AppProvider } from '@/app/app-provider'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense } from 'react'

export default function Body({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<body className={classNames('app', {}, [className])}>
			<AppProvider>
				<Suspense fallback={null}>{children}</Suspense>
			</AppProvider>
		</body>
	)
}
