import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import FAQPage from './(ui)/FAQ.page'

export const metadata: Metadata = {
	title: 'FAQ - часто задаваемые вопросы',
	description:
		'Ответы на часто задаваемые вопросы о платформе Whai. Найдите информацию о нашем сервисе, как пользоваться платформой и решите свои вопросы.',
	keywords: [
		'FAQ',
		'часто задаваемые вопросы',
		'Whai',
		'поддержка',
		'информация'
	],
	openGraph: {
		title: 'FAQ - часто задаваемые вопросы - Whai',
		description:
			'Получите ответы на часто задаваемые вопросы о платформе Whai. Все, что вам нужно знать о нашей платформе.',
		url: 'https://whai.ru/faq',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <FAQPage />
}
