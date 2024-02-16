'use client'
import { FC, memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import LangSwitcher from '@/features/langSwitcher'
import ThemeSwitcher from '@/features/themeSwitcher'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const { t } = useTranslation()

	return (
		<aside
			className={classNames(
				cls.Sidebar,
				{ [cls.isHovered]: isHovered, [cls.collapsed]: isCollapsed },
				[className],
			)}
		>
			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className={classNames(cls.sidebarHovered, {
					[cls.isCollapsed]: isCollapsed,
				})}
				onMouseEnter={() => {
					setIsHovered(true)
				}}
				onMouseLeave={() => {
					setIsHovered(false)
				}}
			>
				<div className={classNames(cls.arrowHovered, {}, [])}>
					<div className={classNames(cls.arrow, {}, [cls.arrowTop])}></div>
					<div className={classNames(cls.arrow, {}, [cls.arrowBottom])}></div>
				</div>
				<div className={cls.tooltiptext}>
					{isCollapsed ? t('Open') : t('Close')}
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
