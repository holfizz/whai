import AuthForm from '@/features/auth/ui/AuthForm/AuthForm'
import { authConstants } from '@/shared/const/auth'
import Logo from '@/shared/ui/Logo/Logo'
import cls from '../../Auth.module.scss'

export default function LoginPage() {
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
