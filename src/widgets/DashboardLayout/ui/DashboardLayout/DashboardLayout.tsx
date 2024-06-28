'use client'
import Sidebar from '@/widgets/DashboardLayout/ui/Sidebar'
import { FC, ReactNode } from 'react'
import { DashboardNavbar } from '../DashboardNavbar/ui/DashboardNavbar/DashboardNavbar'
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
					<DashboardNavbar />
					<div className={cls.contentWrapper}>{children}</div>
				</div>
			</div>
		</div>
	)
}
