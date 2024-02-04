import { FC, memo, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslation } from 'react-i18next'
import Button from '@/shared/ui/Button/Button'
import { AuthModal } from '@/features/auth/ui/AuthModal/AuthModal'
import { authConstants } from '@/shared/const/auth'
import { useAuth } from '@/features/auth/model/auth.model'
import Icon from '@/shared/ui/Icon/Icon'
import { MdLogout } from 'react-icons/md'

interface NavbarProps {
	className?: string
}

const Navbar: FC<NavbarProps> = memo(({ className }) => {
	const { t } = useTranslation()
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isFormType, setIsFormType] = useState<
		authConstants.LOGIN | authConstants.REGISTER
	>(authConstants.REGISTER)
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
				<h1>asdasds</h1>
				<div className={cls.authPanel}>
					{user?.user.email ? (
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
