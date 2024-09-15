import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import StatisticsPage from './(ui)/Statistics.page'

export const metadata: Metadata = {
	title: 'Статистика и аналитика ваших знаний',
	description:
		'Просматривайте статистику и аналитику ваших знаний Whai. Получите доступ к данным о производительности, активности и результатам.',
	keywords: [
		'статистика',
		'аналитика',
		'данные',
		'Whai',
		'платформа',
		'производительность'
	],
	openGraph: {
		title: 'Статистика и аналитика - Whai',
		description:
			'Исследуйте данные и аналитику платформы Whai. Просматривайте показатели производительности и активности.',
		url: 'https://whai.ru/statistics',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <StatisticsPage />
}
