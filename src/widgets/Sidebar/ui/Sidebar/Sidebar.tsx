'use client'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useWindowSize } from '@/shared/lib/hooks/useWindowSize'
import Line from '@/shared/ui/Line/Line'
import { FC, memo } from 'react'
import { useSidebar } from '../..'
import { sidebarItems } from '../../module/sidebar-items.data'
import SidebarControl from '../SidebarControl/SidebarControl'
import SidebarHeader from '../SidebarHeader/SidebarHeader'
import SidebarItem from '../SidebarItem/SidebarItem'
import cls from './Sidebar.module.scss'
import SidebarCollapsedButton from './SidebarCollapsedButton'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { width } = useWindowSize()
	const { isCollapsed, setIsCollapsed } = useSidebar()
	if (width < 768) {
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
					<Line className={cls.line} color={'var(--grey-100)'} />
				</div>
			</aside>
		)
	}
	return (
		<aside className={classNames(cls.Sidebar, {}, [className])}>
			<div className={cls.wrapper}>
				<SidebarHeader />
				{/* <SidebarCollapsedButton
					setIsCollapsed={setIsCollapsed}
					isCollapsed={isCollapsed}
				/>
				<Workspace /> */}

				<SidebarControl isCollapsed={isCollapsed} />
				{/* <Line
					className={cls.line}
					lineSize={LineSize.LONG}
					color={'var(--grey-100)'}
				/>  */}
				<div className={cls.SidebarListItems}>
					{sidebarItems.map((item, index) => {
						return <SidebarItem item={item} key={index} />
					})}
				</div>
			</div>
		</aside>
	)
})

export default Sidebar
