'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { logout } from '@/features/auth/model/auth.model'
import { Link } from '@/navigation'
import {
	getDashboardRoute,
	getRouteLogin,
	getRouteSignUp,
	getSettingsRoute,
	getSupportRoute,
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
} from '@/shared/ui/Dropdown/Dropdown'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import {
	Avatar,
	DropdownTrigger,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Link as UILink,
	Navbar as UINavbar,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import cls from './Navbar.module.scss'

export function Navbar() {
	const t = useTranslations('Navbar')
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuItems = [
		'Profile',
		'Dashboard',
		'Activity',
		'Analytics',
		'System',
		'Deployments',
		'My Settings',
		'Team Settings',
		'Help & Feedback',
		'Log Out',
	]

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
				<Dropdown color='peach'>
					<NavbarItem>
						<DropdownTrigger>
							<Button
								disableRipple
								className='p-0 bg-transparent data-[hover=true]:bg-transparent'
								radius='sm'
								color='clear'
								size='lg'
							>
								{t('Features')}
								<MdKeyboardArrowDown />
							</Button>
						</DropdownTrigger>
					</NavbarItem>
					<DropdownMenu className='w-[340px]' color='peach'>
						<DropdownItem
							key='autoscaling'
							description='ACME scales apps to meet user demand, automagically, based on load.'
							color='peach'
						>
							Autoscaling
						</DropdownItem>
						<DropdownItem
							key='usage_metrics'
							description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
							color='peach'
						>
							Usage Metrics
						</DropdownItem>
						<DropdownItem
							key='production_ready'
							description='ACME runs on ACME, join us and others serving requests at web scale.'
							color='peach'
						>
							Production Ready
						</DropdownItem>
						<DropdownItem
							key='99_uptime'
							description='Applications stay on the grid with high availability and high uptime guarantees.'
							color='peach'
						>
							+99% Uptime
						</DropdownItem>
						<DropdownItem
							isSelected
							key='supreme_support'
							description='Overcome any challenge with a supporting team ready to respond.'
							color='peach'
						>
							+Supreme Support
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<NavbarItem>
					<Link color='foreground' href='#'>
						{t('Customers')}
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color='foreground' href='#'>
						{t('Integrations')}
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				{userData?.email ? (
					<>
						<Dropdown color='peach'>
							<DropdownTrigger>
								<Avatar
									className={cls.avatar}
									isBordered
									as='button'
									src={userData.avatarPath}
								/>
							</DropdownTrigger>
							<DropdownMenu color='peach' aria-label='Profile Actions'>
								<DropdownItem key='profile' className='h-14 gap-2'>
									<p className='font-semibold'>{t('Signed in as')}</p>
									<p className='font-semibold'>{userData.email}</p>
								</DropdownItem>
								<DropdownItem
									as={Link}
									href={getDashboardRoute()}
									key='dashboard'
								>
									{t('Dashboard')}
								</DropdownItem>
								<DropdownItem
									href={getSettingsRoute()}
									as={Link}
									key='settings'
								>
									{t('Settings')}
								</DropdownItem>
								<DropdownItem
									href={getSupportRoute()}
									as={Link}
									key='help_and_feedback'
								>
									{t('Help Feedback')}
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										logout()
									}}
									key='logout'
									color='danger'
								>
									{t('Log Out')}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
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
								{item}
							</UILink>
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</UINavbar>
	)
}
