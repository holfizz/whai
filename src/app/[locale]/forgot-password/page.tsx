import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ForgotPasswordPage from './(ui)/ForgotPassword.page'

export const metadata: Metadata = {
	title: 'Восстановление пароля',
	description:
		'Восстановите доступ к вашему аккаунту на платформе Whai. Следуйте инструкциям для сброса пароля и восстановления доступа.',
	keywords: [
		'восстановление пароля',
		'сброс пароля',
		'Whai',
		'доступ к аккаунту'
	],
	openGraph: {
		title: 'Восстановление пароля - Whai',
		description:
			'Инструкции по восстановлению пароля на платформе Whai. Узнайте, как сбросить пароль и вернуть доступ к вашему аккаунту.',
		url: 'https://whai.ru/forgot-password',
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
	return <ForgotPasswordPage />
}
