'use client'

import { useLogoutQuery } from '@/features/auth/model/auth.queries'
import { Layout } from '@/widgets/Layout'
import { useTranslations } from 'next-intl'

export default function MainPage() {
	const t = useTranslations('mainPage')
	const { logout } = useLogoutQuery()

	return (
		<Layout>
			<h1>Main Page</h1>
		</Layout>
	)
}
