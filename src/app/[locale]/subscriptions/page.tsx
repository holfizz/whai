import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SubsPageAsync from './(ui)/Subs.async'

export const metadata: Metadata = {
	title: 'Оформление подписки',
	description:
		'Ознакомьтесь с тарифами и условиями оформления подписки на платформе Whai. Выберите наиболее подходящий план и получите доступ к нашим услугам.',
	keywords: ['оформление подписки', 'тарифы', 'Whai', 'платформа', 'подписка'],
	openGraph: {
		title: 'Оформление подписки - Whai',
		description:
			'Узнайте о тарифах и условиях подписки на платформе Whai. Найдите идеальный план для вас и начните пользоваться нашими услугами.',
		url: 'https://whai.ru/subscription',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SubsPageAsync />
}
