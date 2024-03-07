'use client '
import { classNames } from '@/shared/lib/classNames/classNames'
import Sidebar from '@/widgets/Sidebar'
import { FC, ReactNode } from 'react'
import { useSidebar } from '../../../Sidebar'
import { Header } from '../Header/Header'
import cls from './Layout.module.scss'

interface LayoutProps {
	children: ReactNode
	className?: string
}

export const Layout: FC<LayoutProps> = ({ children, className }) => {
	const { isCollapsed } = useSidebar()

	return (
		<div className={classNames(cls.wrapper, {}, [className])}>
			<div className={cls.layout}>
				<Header />
				<div
					style={{
						width: `var(${
							isCollapsed ? '--sidebar-width-collapsed' : '--sidebar-width'
						})`,
					}}
					className={cls.sidebarWrapper}
				>
					<Sidebar />
				</div>
			</div>
			<div
				style={{
					marginLeft: `var(${
						isCollapsed ? '--sidebar-width-collapsed' : '--sidebar-width'
					})`,
				}}
				className={cls.contentWrapper}
			>
				{children}Nd
			</div>
		</div>
	)
}
