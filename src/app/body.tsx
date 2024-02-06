'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense } from 'react'
import Sidebar from '@/widgets/Sidebar'
import Navbar from '@/widgets/Navbar'
import { AppProvider } from '@/app/app-provider'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'

export default function Body({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	const { isCollapsed } = useSidebar()

	return (
		<body className={classNames('app', {}, [className])}>
			<AppProvider>
				<Suspense fallback={null}>
					<Navbar />
					<div className={'app_wrapper'}>
						<Sidebar />
						<div
							className={classNames(
								'content_wrapper',
								{
									['isCollapsed']:
										isCollapsed && document.documentElement.scrollWidth > 768,
									['isCollapsedMobile']:
										document.documentElement.scrollWidth <= 768,
								},
								[],
							)}
						>
							{children}
						</div>
					</div>
				</Suspense>
			</AppProvider>
		</body>
	)
}
