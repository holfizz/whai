import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import CookiePolicyPage from './(ui)/CookiePolicy.page'

export const metadata: Metadata = {
	title: 'Политика Cookie',
	description:
		'Узнайте о нашей политике использования файлов cookie и как мы защищаем вашу информацию.',
	keywords: ['политика cookie', 'файлы cookie', 'конфиденциальность', 'Whai'],
	openGraph: {
		title: 'Политика Cookie - Whai',
		description:
			'Читать о нашей политике использования файлов cookie и способах защиты вашей информации.',
		url: 'https://whai.ru/cookie-policy',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <CookiePolicyPage />
}
