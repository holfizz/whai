import React, { FC, memo, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslation } from 'react-i18next'
import { authConstants } from '@/shared/const/auth'
import { AuthModal, useAuth } from '@/features/auth'
import Button from '@/shared/ui/Button/Button'
import { MdLogout } from 'react-icons/md'
import Icon from '@/shared/ui/Icon/Icon'

interface NavbarProps {
	className?: string
}

const Navbar: FC<NavbarProps> = memo(({ className }) => {
	const { t } = useTranslation()
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false) // New state variable
	const [isFormType, setIsFormType] = useState<authConstants>(
		authConstants.REGISTER,
	)
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
						<Button onClick={logout}>
							<Icon fontSize={30} SVG={MdLogout} />
						</Button>
					) : (
						<>
							<Button onClick={onOpenModalLogin}>{t('log in')}</Button>
							<Button onClick={onOpenModalRegister}>{t('register')}</Button>
						</>
					)}
				</div>
				<div
					onClick={() => setIsBurgerMenuOpen(prevState => !prevState)}
					className={classNames(
						cls.burger,
						{ [cls.active]: isBurgerMenuOpen },
						[],
					)}
				>
					<span></span>
				</div>
			</div>
			<AuthModal
				isOpen={isOpenModal}
				onClose={setIsOpenModal}
				type={isFormType}
			/>
		</header>
	)
})

export default Navbar
