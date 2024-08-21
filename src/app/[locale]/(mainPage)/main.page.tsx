'use client'
// import cls from './mainPage.module.scss'

import { useLogoutQuery } from '@/features/auth/model/auth.queries'
import Button from '@/shared/ui/Button/Button'
import { Layout } from '@/widgets/Layout'
import { useTranslations } from 'next-intl'

export default function MainPage() {
	const t = useTranslations('mainPage')
	const { logout } = useLogoutQuery()
	return (
		<Layout>
			{/* <div className={cls.navbarWrapper}> */}
			<div>
				<h1>Main page</h1>
			</div>
		</Layout>
	)
}
