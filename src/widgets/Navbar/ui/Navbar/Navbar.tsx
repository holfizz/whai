'use client'
import { getRouteLogin } from '@/shared/const/router'
import AppLink from '@/shared/ui/AppLink/AppLink'
import Icon from '@/shared/ui/Icon/Icon'
import Logo from '@/shared/ui/Logo/Logo'
// import { Button } from '@nextui-org/react'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { LuActivity } from 'react-icons/lu'
import { NavbarItem } from '../NavbarItem/NavbarItem'
import cls from './Navbar.module.scss'

interface INavbar {}

export function Navbar({}: INavbar) {
	const t = useTranslations()
	return (
		<header className={cls.Navbar}>
			<div className={cls.wrapper}>
				<Logo className={cls.logo} color='var(--main-color)' />
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
					<AppLink href={getRouteLogin()}>
						<Button size='md' color='clear'>
							{t('Log in')}
						</Button>
					</AppLink>

					<AppLink href={'/sign-up'}>
						<Button className={cls.button} size='md' color='main'>
							{t('Start for free')}
						</Button>
						{/* <Button theme={ButtonTheme.FILL_MAIN}></Button> */}
					</AppLink>
				</div>
			</div>
		</header>
	)
}
