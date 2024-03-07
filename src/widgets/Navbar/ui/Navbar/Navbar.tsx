'use client'
import { getRouteLogin, getRouteSignUp } from '@/shared/const/router'
import AppLink from '@/shared/ui/AppLink/AppLink'
import Button, { ButtonTheme } from '@/shared/ui/Button/Button'
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
				<Logo color='var(--main-color)' />
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
				<div className={cls.signButtons}>
					<AppLink href={getRouteLogin()}>{t('Log in')}</AppLink>

					<AppLink href={getRouteSignUp()}>
						<Button theme={ButtonTheme.FILL_MAIN}>{t('Start for free')}</Button>
					</AppLink>
				</div>
			</div>
		</header>
	)
}
