'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import Sidebar, { useSidebar } from '@/widgets/DashboardLayout/ui/Sidebar'
import { useWindowSize } from '@react-hook/window-size'
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
	className
}) => {
	const { isCollapsed } = useSidebar()
	const [width] = useWindowSize()

	const getWidth = () => {
		if (width <= 640) {
			return '100%'
		}
		return isCollapsed
			? 'calc(100vw - var(--sidebar-width-collapsed))'
			: 'calc(100vw - var(--sidebar-width))'
	}

	return (
		<div className={cls.DashboardLayout}>
			<div className={cls.wrapper}>
				<div className={cls.sidebarWrapper}>
					<Sidebar />
				</div>
				<div className={cls.navbarWrapper}>
					<DashboardNavbar />
					<div className={'flex justify-center'}>
						<div
							style={{
								width: isCollapsed
									? 'calc(var(--sidebar-width-collapsed))'
									: 'calc(var(--sidebar-width))'
							}}
							className={cls.fakeSidebar}
						></div>
						<div
							style={{
								width: getWidth()
							}}
							className={classNames(cls.contentWrapper, {}, [className])}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
