import AuthForm from '@/features/auth/ui/AuthForm/AuthForm'
import { authConstants } from '@/shared/const/auth'
import Logo from '@/shared/ui/Logo/Logo'
import type { Metadata } from 'next'
import cls from './Login.module.scss'

export const metadata: Metadata = {
	title: 'Войти в аккаунт | Whai',
	description: 'Войти в аккаунт на образовательной платформе Whai',
}

export default function Page() {
	return (
		<div className={cls.SignInPage}>
			<div className={cls.wrapper}>
				<header className={cls.header}>
					<Logo className={cls.logo} color='var(--main-color)' />
				</header>
			</div>
			<div className={cls.mainScreen}>
				<div className={cls.authFormWrapper}>
					<AuthForm type={authConstants.LOGIN} />
				</div>
			</div>
		</div>
	)
}
