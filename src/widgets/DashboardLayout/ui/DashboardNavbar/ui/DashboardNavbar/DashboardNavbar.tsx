'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { logout } from '@/features/auth/model/auth.model'
import {
	getDashboardRoute,
	getSettingsRoute,
	getSupportRoute,
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
} from '@/shared/ui/Dropdown/Dropdown'
import {
	Avatar,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sidebarItems } from '../../../Sidebar/module/sidebar-items.data'
import SidebarItem from '../../../Sidebar/ui/SidebarItem/SidebarItem'
import cls from './DashboardNavbar.module.scss'

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
			<NavbarContent justify='end'>
				<Button color='accent'>{t('Subscription')}</Button>
				{userData?.email && (
					<Dropdown color='peach' placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								className={cls.avatar}
								isBordered
								// src={user.avatarPath}
							/>
						</DropdownTrigger>
						<DropdownMenu
							color='peach'
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem color='peach' key='profile' className='h-14 gap-2'>
								<p className='font-semibold'>{t('Signed in as')}</p>
								<p className='font-semibold'>{userData.email}</p>
							</DropdownItem>
							<DropdownItem
								color='peach'
								as={Link}
								href={getDashboardRoute()}
								key='dashboard'
							>
								{t('Dashboard')}
							</DropdownItem>
							<DropdownItem
								color='peach'
								href={getSettingsRoute()}
								as={Link}
								key='settings'
							>
								{t('Settings')}
							</DropdownItem>
							<DropdownItem
								color='peach'
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
					className='sm:hidden'
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
				</div>
			</NavbarMenu>
		</Navbar>
	)
}
