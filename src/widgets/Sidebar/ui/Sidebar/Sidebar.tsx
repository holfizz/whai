'use client'
import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import LangSwitcher from '@/features/langSwitcher'
import ThemeSwitcher from '@/features/themeSwitcher'

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
			<button
				className={cls.SidebarCollapsed}
				onClick={() => {
					setIsCollapsed(isCollapsed)
				}}
			>
				<div className={cls.buttonCollapsed}>
					{isCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
				</div>
			</button>
			<div className={cls.switchers}>
				<LangSwitcher />
				<ThemeSwitcher />
			</div>
		</aside>
	)
})

export default Sidebar
