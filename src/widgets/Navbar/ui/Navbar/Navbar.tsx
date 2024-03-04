import Icon from '@/shared/ui/Icon/Icon'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslation } from 'react-i18next'
import { LuActivity } from 'react-icons/lu'
import { NavbarItem } from '../NavbarItem/NavbarItem'
import cls from './Navbar.module.scss'

interface INavbar {}

export function Navbar({}: INavbar) {
	const { t } = useTranslation()
	return (
		<header className={cls.Navbar}>
			<div className={cls.wrapper}>
				<Logo />
				<div className={cls.links}>
					<NavbarItem
						label={t('Resources')}
						menuItems={[
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Content
									</>
								),
								href: '/new',
							},
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Content
									</>
								),
								href: '/new',
							},
						]}
					></NavbarItem>
					<NavbarItem
						label={t('Resources')}
						menuItems={[
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Content
									</>
								),
								href: '/new',
							},
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Contendasdadsadasdasdt Contendasdadsadasdasdt Content
									</>
								),
								href: '/new',
							},
						]}
					></NavbarItem>
					<NavbarItem
						label={t('Resources')}
						menuItems={[
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Contendasdadsadasdasdt Contendasdadsadasdasdt Content
									</>
								),
								href: '/new',
							},
							{
								content: (
									<>
										<Icon SVG={LuActivity} />
										Contendasdadsadasdasdt
									</>
								),
								href: '/new',
							},
						]}
					></NavbarItem>
				</div>
				<div className={cls.signButtons}></div>
			</div>
		</header>
	)
}
