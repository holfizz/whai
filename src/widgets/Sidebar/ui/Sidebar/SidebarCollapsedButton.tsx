import React, { Dispatch, FC, SetStateAction } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import Tooltip from '@/shared/ui/Tooltip/Tooltip'
import { useTranslation } from 'react-i18next'

interface SidebarCollapsedButtonProps {
	setIsCollapsed: (isCollapsed: boolean) => void
	isCollapsed: boolean
	setIsHovered: Dispatch<SetStateAction<boolean>>
}

const SidebarCollapsedButton: FC<SidebarCollapsedButtonProps> = props => {
	const { setIsCollapsed, isCollapsed, setIsHovered } = props
	const { t } = useTranslation()

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)
	return (
		<button
			onClick={toggleSidebar}
			className={classNames(cls.sidebarHovered, {
				[cls.isCollapsed]: isCollapsed,
			})}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={classNames(cls.arrowHovered, {}, [])}>
				<div className={classNames(cls.arrow, {}, [cls.arrowTop])}></div>
				<div className={classNames(cls.arrow, {}, [cls.arrowBottom])}></div>
			</div>
			<Tooltip className={cls.tooltiptext}>
				{isCollapsed ? t('Open') : t('Close')}
			</Tooltip>
		</button>
	)
}

export default SidebarCollapsedButton
