import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import PrivacyPolicyPage from './(ui)/Privacy.page'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	description:
		'Узнайте, как мы собираем, используем и защищаем вашу личную информацию на платформе Whai. Ознакомьтесь с нашей политикой конфиденциальности.',
	keywords: [
		'политика конфиденциальности',
		'Whai',
		'платформа',
		'защита данных',
		'конфиденциальность'
	],
	openGraph: {
		title: 'Политика конфиденциальности - Whai',
		description:
			'Все о том, как платформа Whai собирает, использует и защищает вашу личную информацию. Прочитайте нашу политику конфиденциальности.',
		url: 'https://whai.ru/privacy-policy',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <PrivacyPolicyPage />
}
