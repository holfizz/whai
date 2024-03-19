import { Link } from '@/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { FC, memo } from 'react'
import { SidebarItem } from '../../module/sidebar-items.data'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
	className?: string
	item: SidebarItem
}

const SidebarItem: FC<SidebarItemProps> = memo(({ item, className }) => {
	return (
		<Button variant='sidebar'>
			<Icon SVG={item.icon} />

			<Link href={item.link} className={cls.link}>
				<div className={classNames('', {}, [className])}>
					<p>{item.text}</p>
				</div>
			</Link>
			<Icon SVG={item.icon} />
		</Button>
	)
})

export default SidebarItem
