'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { logout } from '@/features/auth/model/auth.model'
import {
	getDashboardRoute,
	getSettingsRoute,
	getSupportRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu
} from '@/shared/ui/Dropdown/Dropdown'
import Logo from '@/shared/ui/Logo/Logo'
import Text from '@/shared/ui/Text/Text'
import {
	Avatar,
	DropdownTrigger,
	Navbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	PopoverTrigger
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sidebarItems } from '../../../Sidebar/module/sidebar-items.data'
import SidebarItem from '../../../Sidebar/ui/SidebarItem/SidebarItem'
import cls from './DashboardNavbar.module.scss'
import { FaRegBell } from 'react-icons/fa'
import { Popover, PopoverContent } from '@/shared/ui/Popover/Popover'
import { X } from 'lucide-react'
import { Link } from '@/navigation'

interface IDashboardNavbar {}

export function DashboardNavbar({}: IDashboardNavbar) {
	const t = useTranslations('Navbar')
	const { userData } = useGetProfile()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<Navbar
			disableAnimation={true}
			maxWidth={'full'}
			className={cls.DashboardNavbar}
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={isMenuOpen}
		>
			<NavbarContent justify='start'>
				<div className={cls.logoBlock}>
					<Logo
						color='var(--color-accent)'
						logoType={'short'}
						className={cls.logo}
					/>
					<Text classNameTitle={cls.logoTitle} title='Whai' />
				</div>
			</NavbarContent>
			<NavbarContent justify='end'>
				<Button className={cls.subscriptionButton} color='accent'>
					{t('Subscription')}
				</Button>
				<Popover color={'peach'} placement='bottom-end'>
					<PopoverTrigger>
						<Button
							color={'secondary'}
							isIconOnly={true}
							startContent={<FaRegBell />}
						/>
					</PopoverTrigger>
					<PopoverContent className={cls.popoverContent} color={'peach'}>
						<Button
							className={cls.popoverButton}
							fullWidth
							color={'softPeach'}
							endContent={<X />}
						>
							adasdas
						</Button>
						<Button
							className={cls.popoverButton}
							fullWidth
							color={'softPeach'}
							endContent={<X />}
						>
							adasdas
						</Button>
						<Button
							className={cls.popoverButton}
							fullWidth
							color={'softPeach'}
							endContent={<X />}
						>
							adasdas
						</Button>
					</PopoverContent>
				</Popover>
				{userData?.email && (
					<Dropdown color='white' placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								className={cls.avatar}
								isBordered
								// src={user.avatarPath}
							/>
						</DropdownTrigger>
						<DropdownMenu
							color='white'
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem color='white' key='profile' className='h-14 gap-2'>
								<p className='font-semibold'>{t('Signed in as')}</p>
								<p className='font-semibold'>{userData.email}</p>
							</DropdownItem>
							<DropdownItem
								color='white'
								as={Link}
								href={getDashboardRoute()}
								key='dashboard'
							>
								{t('Dashboard')}
							</DropdownItem>
							<DropdownItem
								color='white'
								href={getSettingsRoute()}
								as={Link}
								key='settings'
							>
								{t('Settings')}
							</DropdownItem>
							<DropdownItem
								color='white'
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
				)}
				<NavbarMenuToggle
					className='md:hidden'
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>
			<NavbarMenu onClick={() => setIsMenuOpen(false)} className={cls.MenuDark}>
				<div onClick={e => e.stopPropagation()} className={cls.Menu}>
					{sidebarItems.map((item, index) => (
						<NavbarMenuItem className={cls.MenuItem} key={index}>
							<SidebarItem
								item={item}
								className='w-full'
								isCollapsed={false}
							></SidebarItem>
						</NavbarMenuItem>
					))}
					<Button size='lg' color='accent'>
						{t('Subscription')}
					</Button>
				</div>
			</NavbarMenu>
		</Navbar>
	)
}