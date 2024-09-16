'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { logout } from '@/features/auth/model/auth.model'
import { Link } from '@/navigation'
import BaseAvatar from '@/shared/assets/image/BaseAvatar.webp'
import {
	getDashboardRoute,
	getSubscriptionsRoute,
	getSupportRoute
} from '@/shared/const/router'

import MenuIcon from '@/shared/assets/icons/Menu'
import Button from '@/shared/ui/Button/Button'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu
} from '@/shared/ui/Dropdown/Dropdown'
import Logo from '@/shared/ui/Logo/Logo'
import {
	Avatar,
	DropdownTrigger,
	Navbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sidebarItems } from '../../../Sidebar/module/sidebar-items.data'
import SidebarItem from '../../../Sidebar/ui/SidebarItem/SidebarItem'
import cls from './DashboardNavbar.module.scss'
import './MenuStyle.scss'
export function DashboardNavbar() {
	const t = useTranslations('Navbar')
	const { userData } = useGetProfile()

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<Navbar
			disableAnimation={true}
			maxWidth={'full'}
			height={'5rem'}
			className={cls.DashboardNavbar}
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={isMenuOpen}
		>
			<NavbarContent justify='start'>
				<Logo logoType={'short'} className={cls.logo} />
			</NavbarContent>
			<NavbarContent justify='end'>
				<Button
					data-tour-step='subscription'
					className='max-md:hidden'
					size='md'
					color='accent'
					as={Link}
					href={getSubscriptionsRoute()}
				>
					{t('Subscription')}
				</Button>

				{userData?.email && (
					<Dropdown
						color='white'
						classNames={{
							base: 'bg-white rounded-[15px]'
						}}
						placement='bottom-end'
					>
						<DropdownTrigger>
							<Avatar
								className={cls.avatar}
								as='button'
								classNames={{
									icon: 'text-decor-2',
									base: 'bg-white'
								}}
								src={userData.avatarPath || BaseAvatar.src}
							/>
						</DropdownTrigger>
						<DropdownMenu color='white' aria-label='Profile Actions'>
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
							{/* <DropdownItem
								color='white'
								href={getSettingsRoute()}
								as={Link}
								key='settings'
							>
								{t('Settings')}
							</DropdownItem> */}
							<DropdownItem
								color='white'
								href={getSupportRoute()}
								as={Link}
								key='help_and_feedback'
							>
								{t('Help Feedback')}
							</DropdownItem>
							<DropdownItem
								className='data-[hover=true]:bg-[#FF9090]'
								onClick={() => {
									logout(true)
								}}
								key='logout'
							>
								{t('Log Out')}
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
				<NavbarMenuToggle
					data-tour-step='menu'
					className='640:hidden w-auto'
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					icon={
						<div className='w-auto h-[40px] aspect-square bg-decor-1 rounded-full flex items-center justify-center'>
							<MenuIcon className={isMenuOpen && 'rotate-180'} />
						</div>
					}
				/>
			</NavbarContent>
			<NavbarMenu onClick={() => setIsMenuOpen(false)} className={cls.MenuDark}>
				<div onClick={e => e.stopPropagation()} className={cls.Menu}>
					{sidebarItems.map((item, index) => (
						<NavbarMenuItem className={cls.MenuItem} key={index}>
							<SidebarItem item={item} isCollapsed={false}></SidebarItem>
						</NavbarMenuItem>
					))}
				</div>
				<div
					data-tour-step='mobile-limits'
					className='ml-[40px] w-[70vw] max-sm:w-[90vw] flex flex-col items-center gap-5 mb-10'
				>
					<div className={`flex w-full items-center gap-5 text-secondary `}>
						<div className='w-[30px] h-[30px] rounded-md text-accent flex justify-center items-center bg-white'>
							{userData?.currentCourseCount}
						</div>
						<h3 className='max-w-1/2 text-ellipsis overflow-hidden'>
							{t('Generations of courses')}
						</h3>
					</div>
					<div className={`flex w-full items-center gap-5 text-secondary`}>
						<div className='w-[30px] h-[30px] rounded-md text-accent flex justify-center items-center bg-decor-1'>
							{userData?.currentLessonCount}
						</div>
						<h3>{t('Generations of lessons')}</h3>
					</div>
					<div className={`flex w-full items-center gap-5 text-secondary`}>
						<div className='w-[30px] h-[30px] rounded-md text-accent flex justify-center items-center bg-bg-accent'>
							{userData?.additionalTitlesCount}
						</div>
						<h3>{t('Block generation')}</h3>
					</div>
				</div>
				<Button
					data-tour-step='mobile-subscription'
					className='ml-[40px] w-[70vw] h-[60px] max-sm:w-[80vw] mb-10'
					size='lg'
					color='accent'
					as={Link}
					href={getSubscriptionsRoute()}
				>
					{t('Subscription')}
				</Button>
			</NavbarMenu>
		</Navbar>
	)
}
