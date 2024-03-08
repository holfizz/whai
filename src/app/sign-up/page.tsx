import Logo from '@/shared/ui/Logo/Logo'
import type { Metadata } from 'next'
import cls from './SignUp.module.scss'

export const metadata: Metadata = {
	title: 'Войти в аккаунт | Whai',
	description: 'Войти на образовательной платформе Whai',
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
				<div className={cls.LeftSide}></div>
				<div className={cls.RightSide}></div>
			</div>
		</div>
	)
}
