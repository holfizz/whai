'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import { FC, memo } from 'react'
import SidebarControl from '../SidebarControl/SidebarControl'
import SidebarHeader from '../SidebarHeader/SidebarHeader'
import cls from './Sidebar.module.scss'
import SidebarCollapsedButton from './SidebarCollapsedButton'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()

	return (
		<aside
			className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [
				className,
			])}
		>
			<div className={cls.wrapper}>
				<SidebarHeader isCollapsed={isCollapsed} />
				<SidebarCollapsedButton
					setIsCollapsed={setIsCollapsed}
					isCollapsed={isCollapsed}
				/>
				{/*<Workspace />*/}

				<SidebarControl isCollapsed={isCollapsed} />
			</div>
		</aside>
	)
})

export default Sidebar
