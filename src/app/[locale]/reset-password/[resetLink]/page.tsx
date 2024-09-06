import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ActivateEmailPage from './(ui)/ResetPassword.page'

export const metadata: Metadata = {
	title: 'Сброс пароля',
	description:
		'Следуйте инструкциям для сброса пароля на платформе Whai и восстановления доступа к вашему аккаунту.',
	keywords: ['сброс пароля', 'Whai', 'восстановление доступа', 'аккаунт'],
	openGraph: {
		title: 'Сброс пароля - Whai',
		description:
			'Инструкции по сбросу пароля на платформе Whai. Узнайте, как восстановить доступ к вашему аккаунту.',
		url: 'https://whai.ru/reset-password',
		type: 'website'
	},
	...NO_INDEX_PAGE
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ActivateEmailPage />
}
