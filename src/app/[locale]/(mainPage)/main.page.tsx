'use client'
// import cls from './mainPage.module.scss'

import { useLogoutQuery } from '@/features/auth/model/auth.queries'
import Button from '@/shared/ui/Button/Button'
import Sidebar from '@/widgets/DashboardLayout/ui/Sidebar'
import { Navbar } from '@/widgets/Navbar'
import { useTranslations } from 'next-intl'
export default function MainPage() {
	const t = useTranslations('mainPage')
	const { logout } = useLogoutQuery()
	return (
		<>
			<Navbar />
			<Sidebar />
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
		</>
	)
}
