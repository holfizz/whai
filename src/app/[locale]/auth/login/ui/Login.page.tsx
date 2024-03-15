'use client'
import { AuthForm } from '@/features/auth'
import { authConstants } from '@/shared/const/auth'
import Loader from '@/shared/ui/Loader/Loader'
import Logo from '@/shared/ui/Logo/Logo'
import { Suspense } from 'react'
import cls from '../../Auth.module.scss'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'

export default function LoginPage() {
	useAuthRedirect()

	return (
		<div className={cls.SignInPage}>
			<div className={cls.wrapper}>
				<header className={cls.header}>
					<Logo className={cls.logo} color='var(--main-color)' />
				</header>
			</div>
			<div className={cls.mainScreen}>
				<div className={cls.authFormWrapper}>
					<Suspense fallback={<Loader />}>
						<AuthForm type={authConstants.LOGIN} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}
