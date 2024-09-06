import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SupportPage from './(ui)/Support.page'

export const metadata: Metadata = {
	title: 'Поддержка и помощь',
	description:
		'Свяжитесь с нашей технической поддержкой для получения помощи и решения проблем на платформе Whai. Мы всегда готовы помочь вам.',
	keywords: [
		'техподдержка',
		'помощь',
		'Whai',
		'техническая поддержка',
		'поддержка пользователей'
	],
	openGraph: {
		title: 'Поддержка и помощь - Whai',
		description:
			'Получите помощь от нашей технической поддержки и решите возникшие проблемы. Узнайте, как связаться с нами и получить необходимую помощь.',
		url: 'https://whai.ru/support',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SupportPage />
}
