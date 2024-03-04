import { useSidebar } from '@/widgets/Sidebar'
import { useTranslation } from 'react-i18next'
import cls from './Header.module.scss'

interface INavbar {}

export function Header({}: INavbar) {
	const { t } = useTranslation()
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
				<div className={cls.signButtons}></div>
			</div>
		</header>
	)
}
