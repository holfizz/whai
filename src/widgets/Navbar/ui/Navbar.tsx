import React, { FC, memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslation } from 'react-i18next'
import { authConstants } from '@/shared/const/auth'
import { useAuth } from '@/features/auth'
import Button from '@/shared/ui/Button/Button'
import { MdLogin, MdLogout } from 'react-icons/md'
import Icon from '@/shared/ui/Icon/Icon'
import Text from '@/shared/ui/Text/Text'

interface NavbarProps {
	className?: string
}

const Navbar: FC<NavbarProps> = memo(({ className }) => {
	const { t } = useTranslation()

	const { user, logout } = useAuth()

	const onOpenModalLogin = useCallback(() => {
		setIsOpenModal(true)
		setIsFormType(authConstants.LOGIN)
	}, [])

	const onOpenModalRegister = useCallback(() => {
		setIsOpenModal(true)
		setIsFormType(authConstants.REGISTER)
	}, [])
	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Logo />
			<div className={cls.navigation}>
				<h1></h1>
				<div className={cls.authPanel}>
					{user ? (
						<Button className={cls.buttonLogout} onClick={logout}>
							<Icon fontSize={30} SVG={MdLogout} />
							<Text className={cls.logoutDescription} text={t('logout')} />
						</Button>
					) : (
						<>
							<Button className={cls.authButton} onClick={onOpenModalLogin}>
								{t('log in')}
							</Button>
							<Button className={cls.authButton} onClick={onOpenModalRegister}>
								{t('register')}
							</Button>
							<button className={cls.loginIcon} onClick={onOpenModalLogin}>
								<Icon SVG={MdLogin} />
							</button>
						</>
					)}
				</div>
			</div>
		</header>
	)
})

export default Navbar
