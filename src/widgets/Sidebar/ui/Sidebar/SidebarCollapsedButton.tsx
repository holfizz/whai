import { classNames } from '@/shared/lib/classNames/classNames'
import Tooltip from '@/shared/ui/Tooltip/Tooltip'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Sidebar.module.scss'

interface SidebarCollapsedButtonProps {
	setIsCollapsed: (isCollapsed: boolean) => void
	isCollapsed: boolean
}

const SidebarCollapsedButton: FC<SidebarCollapsedButtonProps> = props => {
	const { setIsCollapsed, isCollapsed } = props
	const { t } = useTranslation()

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)
	return (
		<button
			onClick={toggleSidebar}
			className={classNames(cls.sidebarHovered, {
				[cls.isCollapsed]: isCollapsed,
			})}
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