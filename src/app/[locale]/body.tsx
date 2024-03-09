import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense } from 'react'
import { AppProvider } from './app-provider'

export default function Body({
	children,
	className,
	locale,
}: {
	children: React.ReactNode
	className?: string
	locale: string
}) {
	return (
		<body className={classNames('app', {}, [className])}>
			<AppProvider locale={locale}>
				<Suspense fallback={null}>{children}</Suspense>
			</AppProvider>
		</body>
	)
}
