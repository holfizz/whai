import { FC, memo } from 'react'
import cls from './SidebarItem.module.scss'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'

interface SidebarItemProps {
	className?: string
	item: any
}

const SidebarItem: FC<SidebarItemProps> = memo(({ item, className }) => {
	return (
		<AppLink href={item.path} className={cls.link}>
			<item.Icon />
			<div className={classNames('', {}, [className])}>
				<div>{item.text}</div>
			</div>
		</AppLink>
	)
})

export default SidebarItem
