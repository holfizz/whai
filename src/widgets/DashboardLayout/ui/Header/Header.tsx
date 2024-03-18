import { useSidebar } from '@/widgets/Sidebar'
import { useTranslations } from 'next-intl'
import cls from './Header.module.scss'

interface INavbar {}

export function Header({}: INavbar) {
	const t = useTranslations()
	const { isCollapsed } = useSidebar()

	return (
		<header
			className={cls.Header}
			style={{
				width: `calc(100% - ${
					isCollapsed
						? 'var(--sidebar-width-collapsed)'
						: 'var(--sidebar-width)'
				})`,
			}}
		>
			<div className={cls.wrapper}>
				<div className={cls.links}></div>
			</div>
		</header>
	)
}
