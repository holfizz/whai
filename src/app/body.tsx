'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Suspense } from 'react'
import { AppProvider } from '@/app/app-provider'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import Sidebar from '@/widgets/Sidebar'

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
					<div className={'wrapper'}>
						<div
							style={{
								width: `var(${isCollapsed ? '--sidebar-width-collapsed' : '--sidebar-width'})`,
							}}
							className={'sidebar_wrapper'}
						>
							<Sidebar />
						</div>
						<div className={'content_wrapper'}>{children}</div>
					</div>
				</Suspense>
			</AppProvider>
		</body>
	)
}
/*dssadas*/
