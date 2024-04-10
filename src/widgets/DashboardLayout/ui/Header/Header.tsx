'use client'
import { useAuth } from '@/features/auth'
import {
	getDashboardRoute,
	getSettingsRoute,
	getSupportRoute,
} from '@/shared/const/router'
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Link,
	Navbar,
	NavbarContent,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import cls from './Header.module.scss'

interface INavbar {}

export function Header({}: INavbar) {
	const t = useTranslations()
	const { user, logout } = useAuth()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<Navbar className={cls.header} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent justify='end'>
				{user?.email ? (
					<NavbarContent>
						<Input
							classNames={{
								base: 'max-w-full sm:max-w-[10rem] h-10',
								mainWrapper: 'h-full',
								input: 'text-small',
								inputWrapper:
									'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
							}}
							placeholder='Type to search...'
							size='sm'
							startContent={<LuSearch size={18} />}
							type='search'
						/>
						<Dropdown placement='bottom-end'>
							<DropdownTrigger>
								<Avatar
									className={cls.avatar}
									isBordered
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
									color='warning'
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
					</NavbarContent>
				) : (
					<></>
				)}
			</NavbarContent>
		</Navbar>
	)
}
