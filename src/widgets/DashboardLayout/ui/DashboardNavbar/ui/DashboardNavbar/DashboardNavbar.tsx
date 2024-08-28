'use client'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { logout } from '@/features/auth/model/auth.model'
import { Link } from '@/navigation'
import {
	getDashboardRoute,
	getSubscriptionsRoute,
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
	NavbarMenuToggle
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
				<Button
					className='max-md:hidden'
					size='md'
					color='accent'
					as={Link}
					href={getSubscriptionsRoute()}
				>
					{t('Subscription')}
				</Button>
				{/* <Popover color={'gray-text'} placement='bottom-end'>
					<PopoverTrigger>
						<Button
							color={'clear'}
							isIconOnly={true}
							startContent={<BellIcon />}
						/>
					</PopoverTrigger>
					<PopoverContent className={cls.popoverContent} color={'secondary'}>
						<div className='mx-2 flex justify-center items-center w-fill'>
							<h1 className='text-lg'>{t('Notice')}</h1>
							<div className='ml-3 w-6 h-6 rounded-full bg-error-10 text-white text-sm flex justify-center items-center'>
								0
							</div>
						</div>
					</PopoverContent>
				</Popover> */}
				{userData?.email && (
					<Dropdown
						color='white'
						classNames={{ base: 'bg-white rounded-[15px]' }}
						placement='bottom-end'
					>
						<DropdownTrigger>
							<Avatar
								className={cls.avatar}
								as='button'
								classNames={{
									icon: 'text-decor-2',
									base: 'bg-decor-1'
								}}
								src={userData.avatarPath}
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
					className='640:hidden'
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
				/>
			</NavbarContent>
			<NavbarMenu onClick={() => setIsMenuOpen(false)} className={cls.MenuDark}>
				<div onClick={e => e.stopPropagation()} className={cls.Menu}>
					{sidebarItems.map((item, index) => (
						<NavbarMenuItem className={cls.MenuItem} key={index}>
							<SidebarItem
								item={item}
								className=''
								isCollapsed={false}
							></SidebarItem>
						</NavbarMenuItem>
					))}
				</div>
				<Button
					className='mx-auto w-[70vw] h-[60px] max-sm:w-[90vw] mb-10'
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
