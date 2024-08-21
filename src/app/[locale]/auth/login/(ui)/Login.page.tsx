'use client'
import { AuthForm } from '@/features/auth'
import { Link } from '@/navigation'
import { authConstants } from '@/shared/const/auth'
import { getRouteOffer, getRoutePrivacy } from '@/shared/const/router'
import { useAuthRedirect } from '@/shared/lib/hooks/useAuthRedirect'
import Loader from '@/shared/ui/Loader/Loader'
import Logo from '@/shared/ui/Logo/Logo'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'
import cls from '../../Auth.module.scss'

export default function LoginPage() {
	useAuthRedirect()
	const t = useTranslations('auth')

	return (
		<div className={cls.SignInPage}>
			<div className={cls.wrapper}>
				<header className={cls.header}>
					<Logo
						isDashboard={false}
						className={cls.logo}
						color='var(--main-color)'
					/>
				</header>
			</div>
			<div className={cls.mainScreen}>
				<div className={cls.authFormWrapper}>
					<Suspense fallback={<Loader />}>
						<AuthForm type={authConstants.LOGIN} />
						<div className='flex items-start text-secondary w-[400px] max-md:w-[90vw]'>
							<p className='text-center text-[12px]'>
								{t('Upon login I accept')}{' '}
								<Link href={getRouteOffer()} className='underline'>
									{t('Terms and Conditions')}
								</Link>
								{', '}
								<Link href={getRoutePrivacy()} className='underline'>
									{t('Personal data processing policy')}
								</Link>
							</p>
						</div>
					</Suspense>
				</div>
			</div>
		</div>
	)
}
