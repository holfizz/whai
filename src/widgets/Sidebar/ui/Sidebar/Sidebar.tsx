'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { FC, memo } from 'react'
import SidebarHeader from '../SidebarHeader/SidebarHeader'
import cls from './Sidebar.module.scss'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	return (
		<aside className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.wrapper}>
				<SidebarHeader />
				{/* <SidebarCollapsedButton
					setIsCollapsed={setIsCollapsed}
					isCollapsed={isCollapsed}
				/>
				<Workspace /> */}

				{/* <SidebarControl isCollapsed={isCollapsed} />
				<Line
					className={cls.line}
					lineSize={LineSize.LONG}
					color={'var(--grey-100)'}
				/> */}
			</div>
		</aside>
	)
})

export default Sidebar
