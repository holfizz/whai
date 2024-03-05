import { classNames } from '@/shared/lib/classNames/classNames'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { FC, memo } from 'react'
import { IconType } from 'react-icons'
import cls from './SidebarItem.module.scss'

interface ItemProps {
	title: string
	link: string
	Icon: IconType
}
interface SidebarItemProps {
	className?: string
	item: ItemProps
}

const SidebarItem: FC<SidebarItemProps> = memo(({ item, className }) => {
	return (
		<AppLink href={item.link} className={cls.link}>
			<item.Icon />
			<div className={classNames('', {}, [className])}>
				<div>{item.title}</div>
			</div>
		</AppLink>
	)
})

export default SidebarItem
