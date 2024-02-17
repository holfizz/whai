'use client'
import React, { FC, memo, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useSidebar } from '@/widgets/Sidebar/module/sidebar.module'
import LangSwitcher from '@/features/langSwitcher'
import ThemeSwitcher from '@/features/themeSwitcher'
import { useTranslation } from 'react-i18next'
import { AuthModal, useAuth } from '@/features/auth'
import { authConstants } from '@/shared/const/auth'
import Button, { ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { HiLogin, HiOutlinePencilAlt } from 'react-icons/hi'
import Text, { TextSize, TextTheme } from '@/shared/ui/Text/Text'
import Logo, { LogoSize } from '@/shared/ui/Logo/Logo'
import { RiUser4Line } from 'react-icons/ri'

interface SidebarProps {
	className?: string
}

const Sidebar: FC<SidebarProps> = memo(({ className }) => {
	const { isCollapsed, setIsCollapsed } = useSidebar()
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isFormType, setIsFormType] = useState<authConstants>(
		authConstants.LOGIN,
	)
	const { t } = useTranslation()
	const { user, logout } = useAuth()

	const toggleSidebar = () => setIsCollapsed(!isCollapsed)
	const toggleHover = (hovered: boolean) => setIsHovered(hovered)
	const toggleAuthModal = useCallback(() => setIsOpenModal(prev => !prev), [])

	const authActionButton = useCallback(() => {
		if (user) {
			logout()
		} else {
			toggleAuthModal()
		}
	}, [logout, user, toggleAuthModal])

	const maskEmail = (email: string): string => {
		if (typeof email !== 'undefined' || email === null || email !== 'unknown')
			return 'User'
		const [username, domain] = (email as string).split('@')
		const visiblePart = username.charAt(0) + '...' + username.slice(-1)
		return `${visiblePart}@${domain}`
	}

	return (
		<aside
			className={classNames(
				cls.Sidebar,
				{ [cls.isHovered]: isHovered, [cls.collapsed]: isCollapsed },
				[className],
			)}
		>
			<div className={cls.sidebarHeader}>
				{isCollapsed ? (
					<Logo logoSize={LogoSize.S} />
				) : (
					<Logo logoSize={LogoSize.M} />
				)}
				<Button theme={ButtonTheme.CLEAR} className={cls.addButton}>
					<Icon
						className={cls.addIcon}
						fontSize={23}
						SVG={HiOutlinePencilAlt}
					/>
				</Button>
			</div>
			<button
				onClick={toggleSidebar}
				className={classNames(cls.sidebarHovered, {
					[cls.isCollapsed]: isCollapsed,
				})}
				onMouseEnter={() => toggleHover(true)}
				onMouseLeave={() => toggleHover(false)}
			>
				<div className={classNames(cls.arrowHovered, {}, [])}>
					<div className={classNames(cls.arrow, {}, [cls.arrowTop])}></div>
					<div className={classNames(cls.arrow, {}, [cls.arrowBottom])}></div>
				</div>
				<div className={cls.tooltiptext}>
					{isCollapsed ? t('Open') : t('Close')}
				</div>
			</button>
			<div className={cls.sidebarControl}>
				{!!user && (
					<div className={cls.switchers}>
						<LangSwitcher />
						<ThemeSwitcher />
					</div>
				)}
				<Button
					onClick={authActionButton}
					size={ButtonSize.FULL}
					theme={ButtonTheme.CLEAR}
					className={cls.authButton}
				>
					{user ? (
						<div className={cls.userProfile}>
							<div className={cls.avatar}>
								<Icon
									className={cls.userIcon}
									SVG={RiUser4Line}
									fontSize={30}
								/>
							</div>
							{!isCollapsed && (
								<Text
									className={cls.email}
									size={TextSize.L}
									theme={TextTheme.PRIMARY}
									text={maskEmail(user.email)}
								/>
							)}
						</div>
					) : (
						<div className={cls.authControl}>
							<Icon SVG={HiLogin} fontSize={30} />
							{!isCollapsed && (
								<Text
									size={TextSize.S}
									theme={TextTheme.PRIMARY}
									title={t('log in')}
								/>
							)}
						</div>
					)}
				</Button>
				<AuthModal
					setIsFormType={setIsFormType}
					isOpen={isOpenModal}
					onClose={toggleAuthModal}
					type={isFormType}
				/>
			</div>
		</aside>
	)
})

export default Sidebar
