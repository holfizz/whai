'use client'

import { useLogoutQuery } from '@/features/auth/model/auth.queries'
import { Link } from '@/navigation'
import Button from '@/shared/ui/Button/Button'
import { Layout } from '@/widgets/Layout'
import { useTranslations } from 'next-intl'

export default function MainPage() {
	const t = useTranslations('mainPage')
	const { logout } = useLogoutQuery()

	return (
		<Layout>
			<div>
				<h1>{t('mainPageTitle')}</h1>
				<Button as={Link} href='https://securepayments.tinkoff.ru/Uac2gTQD'>
					Pay for all
				</Button>
			</div>
		</Layout>
	)
}
