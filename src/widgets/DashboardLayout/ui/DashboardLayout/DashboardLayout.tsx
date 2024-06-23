'use client'
import { Navbar } from '@/widgets/Navbar'
import Sidebar from '@/widgets/Sidebar'
import { FC, ReactNode } from 'react'
import cls from './DashboardLayout.module.scss'

interface LayoutProps {
	children: ReactNode
	className?: string
	sidebarChildren?: ReactNode
}

export const DashboardLayout: FC<LayoutProps> = ({
	children,
	sidebarChildren,
	className,
}) => {
	return (
		<div className={cls.DashboardLayout}>
			<div className={cls.wrapper}>
				<div className={cls.sidebarWrapper}>
					<Sidebar />
				</div>
				<div className={cls.navbarWrapper}>
					<Navbar />
				</div>
				<div className={cls.contentWrapper}>{children}</div>
			</div>
		</div>
	)
}
