'use client'
// import cls from './mainPage.module.scss'

import { useLogoutQuery } from '@/features/auth/model/auth.queries'
import Button from '@/shared/ui/Button/Button'
import { Navbar } from '@/widgets/Navbar'
import { useTranslations } from 'next-intl'

export default function MainPage() {
	const t = useTranslations('mainPage')
	const { logout } = useLogoutQuery()
	return (
		<div>
			<Navbar />
			{/* <div className={cls.navbarWrapper}> */}
			<div>
				<Button
					onClick={() => {
						logout()
					}}
				>
					logouttasdas
				</Button>
				asdasdasd
				<h1 style={{ color: 'white', fontSize: 50 }}>
					dnasdkasndlkasdlkasdnas
				</h1>
			</div>
		</div>
	)
}
