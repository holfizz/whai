'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { Link } from '@/navigation'
import {
	getDashboardRoute,
	getFAQRoute,
	getReviewRoute,
	getRouteAbout,
	getRouteLogin,
	getRouteMain,
	getRouteSignUp
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Link as UILink,
	Navbar as UINavbar
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import cls from './Navbar.module.scss'

export function Navbar() {
	const t = useTranslations('Navbar')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuItems = ['Home', 'About us', 'Reviews', 'FAQ'] as any

	const [isClient, setIsClient] = useState(false)
	const { userData } = useGetProfile()

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<UINavbar className={cls.navbar} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<Logo color='var(--main-color)' logoSize={LogoSize.S} />
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem>
					<Link color='foreground' href={getRouteMain()}>
						{t('Home')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' href={getRouteAbout()}>
						{t('About us')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' href={getReviewRoute()}>
						{t('Reviews')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' href={getFAQRoute()}>
						{t('FAQ')}
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				{userData?.email ? (
					<>
						<Button as={Link} href={getDashboardRoute()} color='accent'>
							{t('Continue studying')}
						</Button>
					</>
				) : (
					<>
						{isClient && (
							<>
								<NavbarItem className='hidden lg:flex'>
									<Link className={cls.LoginButton} href={getRouteLogin()}>
										{t('Log in')}
									</Link>
								</NavbarItem>
								<NavbarItem>
									<Button
										as={Link}
										color='accent'
										href={getRouteSignUp()}
										className={cls.SignUpButton}
									>
										{t('Sign up')}
									</Button>
								</NavbarItem>
							</>
						)}
					</>
				)}
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link href={'#'}>
							<UILink color='foreground' className='w-full' href='#' size='lg'>
								{t(item)}
							</UILink>
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</UINavbar>
	)
}