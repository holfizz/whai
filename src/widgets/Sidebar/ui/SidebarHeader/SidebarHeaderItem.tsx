import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import cls from './SidebarHeader.module.scss'

interface SidebarHeaderItemProps {
	isCollapsed: boolean
	color?: string
	title?: string
}

const SidebarHeaderItem: FC<SidebarHeaderItemProps> = ({
	isCollapsed,
	color = 'red',
	title = 'New Course',
}) => {
	const t = useTranslations()

	return (
		<Button size='lg' className={classNames(cls.sidebarHeaderItem, {}, [])}>
			<div className={cls.Sphere} style={{ background: color }} />
			{!isCollapsed && (
				<Text size={TextSize.L} className={cls.title} text={title} />
			)}
		</Button>
	)
}

export default SidebarHeaderItem
