'use client'
import Logo from '@/shared/ui/Logo/Logo'
// import { Button } from '@nextui-org/react'
import { getRouteLogin, getRouteSignUp } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import { LogoSize } from '@/shared/ui/Logo/Logo'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Navbar as UINavbar,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import cls from './Navbar.module.scss'

interface INavbar {}

export function Navbar({}: INavbar) {
	const t = useTranslations()
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
								variant='light'
								size='lg'
								color='default'
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
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link color='foreground' className='w-full' href='#' size='lg'>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</UINavbar>
	)
}
