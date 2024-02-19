'use client'
import React, { FC, memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import SidebarControl from './SidebarControl'
import SidebarCollapsedButton from './SidebarCollapsedButton'
import SidebarHeader from './SidebarHeader'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()
	const [isHovered, setIsHovered] = useState(false)

	return (
		<aside
			className={classNames(
				cls.Sidebar,
				{ [cls.isHovered]: isHovered, [cls.collapsed]: isCollapsed },
				[className],
			)}
		>
			<SidebarHeader isCollapsed={isCollapsed} />
			<SidebarCollapsedButton
				setIsCollapsed={setIsCollapsed}
				isCollapsed={isCollapsed}
				setIsHovered={setIsHovered}
			/>
			{/*<Workspace />*/}

			<SidebarControl isCollapsed={isCollapsed} />
		</aside>
	)
})

export default Sidebar
