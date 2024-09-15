import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ChatAIPage from './(ui)/ChatAI.page'

export const metadata: Metadata = {
	title: 'Чат с AI - Виртуальный помощник Whai',
	description:
		'Общайтесь с искусственным интеллектом Whai для решения задач, получения советов и рекомендаций. Интеллектуальная помощь в реальном времени.',
	keywords: [
		'чат AI',
		'искусственный интеллект',
		'Whai',
		'виртуальный помощник',
		'советы',
		'рекомендации'
	],
	openGraph: {
		title: 'Чат с AI - Whai',
		description:
			'Общайтесь с AI-помощником Whai для выполнения различных задач и получения персонализированных рекомендаций.',
		url: 'https://whai.ru/chat-ai',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ChatAIPage />
}
