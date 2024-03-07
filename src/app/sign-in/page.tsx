import authFunnyPersonPicture from '@/shared/assets/authFunnyPerson.png'
import Logo from '@/shared/ui/Logo/Logo'
import type { Metadata } from 'next'
import Image from 'next/image'
import cls from './SignIn.module.scss'

export const metadata: Metadata = {
	title: 'Войти в аккаунт | Whai',
	description: 'Войти на образовательной платформе Whai',
}

export default function Page() {
	return (
		<div className={cls.SignInPage}>
			<Logo color='var(--main-color)' className={cls.logo}></Logo>
			<div className={cls.mainScreen}>
				<div className={cls.LeftSide}></div>
				<div className={cls.RightSide}>
					<Image
						src={authFunnyPersonPicture}
						width={700}
						alt='Сheerful little man'
					/>
				</div>
			</div>
		</div>
	)
}
