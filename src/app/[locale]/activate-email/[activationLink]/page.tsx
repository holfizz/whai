import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { URL } from 'url'
import ActivateEmailPage from './(ui)/ActivateEmail.page'

export const metadata: Metadata = {
	title: 'Активация аккаунта',
	description:
		'Активируйте ваш аккаунт на платформе Whai. Следуйте инструкциям, чтобы завершить процесс регистрации.',
	keywords: ['активация аккаунта', 'регистрация', 'Whai'],
	openGraph: {
		title: 'Активация аккаунта - Whai',
		description:
			'Завершите процесс регистрации, активировав ваш аккаунт на платформе Whai.',
		url: new URL('/activate-email', 'https://whai.ru').toString(),
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
