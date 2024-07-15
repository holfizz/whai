import { Link } from '@/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { useTranslations } from 'next-intl'
import { FC, memo } from 'react'
import { ISidebarItem } from '../../module/sidebar-items.data'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
	className?: string
	item: ISidebarItem
	isCollapsed?: boolean
}

const SidebarItem: FC<SidebarItemProps> = memo(
	({ item, className, isCollapsed }) => {
		const t = useTranslations('Sidebar')
		const isNotNullOrUndefined =
			isCollapsed !== null && isCollapsed !== undefined
		return (
			<Button className='mt-2' variant='sidebar'>
				<Icon SVG={item.icon} />
				{!isCollapsed && isNotNullOrUndefined && (
					<Link href={item.link} className={cls.link}>
						<div className={classNames('', {}, [className])}>
							<p>{t(item.text)}</p>
						</div>
					</Link>
				)}
			</Button>
		)
	}
)

export default SidebarItem
