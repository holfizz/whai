'use client'
import LangSwitcher from '@/features/langSwitcher'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import {
	Button,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import cls from './mainPage.module.scss'

export default function Page() {
	const t = useTranslations('mainPage')
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
		<>
			<div className={cls.navbarWrapper}>
				<Navbar onMenuOpenChange={setIsMenuOpen}>
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
									>
										Features
									</Button>
								</DropdownTrigger>
							</NavbarItem>
							<DropdownMenu
								aria-label='ACME features'
								className='w-[340px]'
								itemClasses={{
									base: 'gap-4',
								}}
							>
								<DropdownItem
									key='autoscaling'
									description='ACME scales apps to meet user demand, automagically, based on load.'
								>
									Autoscaling
								</DropdownItem>
								<DropdownItem
									key='usage_metrics'
									description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
								>
									Usage Metrics
								</DropdownItem>
								<DropdownItem
									key='production_ready'
									description='ACME runs on ACME, join us and others serving requests at web scale.'
								>
									Production Ready
								</DropdownItem>
								<DropdownItem
									key='99_uptime'
									description='Applications stay on the grid with high availability and high uptime guarantees.'
								>
									+99% Uptime
								</DropdownItem>
								<DropdownItem
									key='supreme_support'
									description='Overcome any challenge with a supporting team ready to respond.'
								>
									+Supreme Support
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<NavbarItem isActive>
							<Link href='#' aria-current='page'>
								Customers
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color='foreground' href='#'>
								Integrations
							</Link>
						</NavbarItem>
					</NavbarContent>
					<NavbarContent justify='end'>
						<NavbarItem className='hidden lg:flex'>
							<Link href='#'>Login</Link>
						</NavbarItem>
						<NavbarItem>
							<Button as={Link} color='primary' href='#' variant='flat'>
								Sign Up
							</Button>
						</NavbarItem>
					</NavbarContent>
					<NavbarMenu>
						{menuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2
											? 'primary'
											: index === menuItems.length - 1
											? 'danger'
											: 'foreground'
									}
									className='w-full'
									href='#'
									size='lg'
								>
									{item}
								</Link>
							</NavbarMenuItem>
						))}
					</NavbarMenu>
				</Navbar>
			</div>
			{/* <div className={cls.welcomeBlock}>
                <div className={cls.textBlock}>
                    <div className={cls.titleBlock}>
                        <h1
                            className={classNames(cls.mainPageTitle_one, {}, [
                                cls.mainPageTitle,
                            ])}
                        >
                            {t('The internet')}
                        </h1>
                        <h1
                            className={classNames(cls.mainPageTitle_two, {}, [
                                cls.mainPageTitle,
                            ])}
                        >
                            {t('and AI')}
                            <Icon
                                color='var(--main-color)'
                                className={cls.logoSmall}
                                SVG={LogoSmall}
                            />
                            <Icon
                                color='var(--main-color)'
                                className={cls.logoSmall}
                                SVG={LogoSmall}
                            />
                            <Icon
                                color='var(--main-color)'
                                className={cls.logoSmall}
                                SVG={LogoSmall}
                            />
                            <Icon
                                color='var(--main-color)'
                                className={cls.logoSmall}
                                SVG={LogoSmall}
                            />
                        </h1>
                        <h1
                            className={classNames(cls.mainPageTitle_three, {}, [
                                cls.mainPageTitle,
                            ])}
                        >
                            {t('is your')}
                        </h1>
                        <h1
                            className={classNames(cls.mainPageTitle_four, {}, [
                                cls.mainPageTitle,
                            ])}
                        >
                            {t('education')}
                        </h1>
                    </div>
                    <Icon className={cls.asterisk} SVG={Asterisk} />
                </div>
            </div> */}
			<LangSwitcher />
		</>
	)
}
