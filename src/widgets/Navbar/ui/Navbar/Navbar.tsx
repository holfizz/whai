'use client'
import Logo from '@/shared/ui/Logo/Logo'
// import { Button } from '@nextui-org/react'
import { useAuth } from '@/features/auth'
import { Link } from '@/navigation'
import {
	getDashboardRoute,
	getRouteLogin,
	getRouteSignUp,
	getSettingsRoute,
	getSupportRoute,
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { LogoSize } from '@/shared/ui/Logo/Logo'
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
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
	const { user, setAuthUser, logout } = useAuth()
	const [isClient, setIsClient] = useState(false)
	useEffect(() => {
		setIsClient(true)
	}, [])
	return (
		<UINavbar onMenuOpenChange={setIsMenuOpen}>
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
				<Dropdown>
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
					<DropdownMenu
						variant='faded'
						aria-label='ACME features'
						className='w-[340px]'
						itemClasses={{
							base: 'gap-4',
						}}
					>
						<DropdownItem
							variant='faded'
							key='autoscaling'
							description='ACME scales apps to meet user demand, automagically, based on load.'
						>
							Autoscaling
						</DropdownItem>
						<DropdownItem
							variant='faded'
							key='usage_metrics'
							description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
						>
							Usage Metrics
						</DropdownItem>
						<DropdownItem
							variant='faded'
							color='secondary'
							key='production_ready'
							description='ACME runs on ACME, join us and others serving requests at web scale.'
						>
							Production Ready
						</DropdownItem>
						<DropdownItem
							color='warning'
							key='99_uptime'
							description='Applications stay on the grid with high availability and high uptime guarantees.'
						>
							+99% Uptime
						</DropdownItem>
						<DropdownItem
							variant='faded'
							color='danger'
							isSelected
							key='supreme_support'
							description='Overcome any challenge with a supporting team ready to respond.'
						>
							+Supreme Support
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
				<NavbarItem isActive>
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
				{user?.email ? (
					<>
						<Dropdown placement='bottom-end'>
							<DropdownTrigger>
								<Avatar
									className={cls.avatar}
									isBordered
									as='button'
									src={user.avatarPath}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Profile Actions' variant='flat'>
								<DropdownItem
									color='secondary'
									key='profile'
									className='h-14 gap-2'
								>
									<p className='font-semibold'>{t('Signed in as')}</p>
									<p className='font-semibold'>{user.email}</p>
								</DropdownItem>
								<DropdownItem key='dashboard'>
									<Link href={getDashboardRoute()}>{t('Dashboard')}</Link>
								</DropdownItem>
								<DropdownItem key='settings'>
									<Link href={getSettingsRoute()}>{t('Settings')}</Link>
								</DropdownItem>
								<DropdownItem color='warning' key='help_and_feedback'>
									<Link href={getSupportRoute()}>{t('Help Feedback')}</Link>
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
										color='mainFill'
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
