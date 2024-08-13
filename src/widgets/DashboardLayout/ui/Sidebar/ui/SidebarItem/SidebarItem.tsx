import { Link, locales } from '@/navigation'
import { classNames } from '@/shared/lib/classNames/classNames'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
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
		const pathname = usePathname()

		// Function to remove locale from the pathname
		const removeLocaleFromPathname = (pathname: string) => {
			for (const locale of locales) {
				if (pathname.startsWith(`/${locale}/`)) {
					return pathname.replace(`/${locale}`, '') || '/'
				}
			}
			return pathname
		}

		const normalizedPathname = removeLocaleFromPathname(pathname)

		// Ensure that the exact match or nested routes apply correctly
		const isActive =
			item.link !== '/d'
				? normalizedPathname.startsWith(item.link) &&
				  normalizedPathname !== '/d'
				: normalizedPathname === item.link

		return (
			<Button
				className={classNames(
					'mt-2',
					{ [cls.active]: isActive }, // Apply the active class if the item is active
					[className]
				)}
				variant='sidebar'
				as={Link}
				href={item.link}
			>
				<item.icon
					className={classNames(
						isActive ? 'fill-accent' : 'fill-secondary' // Change icon color based on active state
					)}
				/>
				{!isCollapsed && (
					<div className={cls.link}>
						<p
							className={classNames(
								isActive ? 'text-accent' : 'text-secondary' // Change text color based on active state
							)}
						>
							{t(item.text)}
						</p>
					</div>
				)}
			</Button>
		)
	}
)

export default SidebarItem
