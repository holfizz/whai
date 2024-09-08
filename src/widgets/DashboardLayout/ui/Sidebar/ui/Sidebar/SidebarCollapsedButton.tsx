import ArrowRight from '@/shared/assets/icons/ArrowRight'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import cls from './Sidebar.module.scss'

interface SidebarCollapsedButtonProps {
	setIsCollapsed: (isCollapsed: boolean) => void
	isCollapsed: boolean
}

const SidebarCollapsedButton: FC<SidebarCollapsedButtonProps> = props => {
	const { setIsCollapsed, isCollapsed } = props
	const t = useTranslations()

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)
	return (
		<button onClick={toggleSidebar} className={cls.sidebarCollapsedButton}>
			<div
				className={classNames(
					cls.arrowBtn,
					{
						[cls.isCollapsedBtn]: isCollapsed
					},
					[]
				)}
			>
				<ArrowRight className='rotate-180' />
			</div>
		</button>
	)
}

export default SidebarCollapsedButton
