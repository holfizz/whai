import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SubscriptionTermsPage from './(ui)/SubscriptionTerms.page'

export const metadata: Metadata = {
	title: 'Оферта подписки',
	description:
		'Ознакомьтесь с условиями подписки на платформе Whai. Здесь вы найдете важную информацию о нашей подписке и её условиях.',
	keywords: [
		'офферта подписки',
		'подписка',
		'Whai',
		'условия подписки',
		'платформа'
	],
	openGraph: {
		title: 'Оферта подписки - Whai',
		description:
			'Подробности об условиях подписки на платформе Whai. Узнайте, как подписаться и что включает в себя подписка.',
		url: 'https://whai.ru/subscription-terms',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SubscriptionTermsPage />
}
