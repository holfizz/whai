'use client'
import { AuthForm } from '@/features/auth'
import { authConstants } from '@/shared/const/auth'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'
import cls from '../../Auth.module.scss'

export default function Page() {
	useAuthRedirect()
	const t = useTranslations('auth')

	return (
		<div className={cls.SignInPage}>
			<div className={cls.wrapper}>
				<header className={cls.header}>
					<Logo color='var(--main-color)' />
				</header>
			</div>
			<div className={cls.mainScreen}>
				<div className={cls.authFormWrapper}>
					<Suspense fallback={<BigDotsLoader />}>
						<AuthForm type={authConstants.SIGNUP} />
					</Suspense>
				</div>
			</div>
		</div>
	)
}
