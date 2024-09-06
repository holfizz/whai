import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ReviewPage from './(ui)/Review.page'

export const metadata: Metadata = {
	title: 'Отзывы',
	description:
		'Прочитайте отзывы о платформе Whai от наших пользователей. Узнайте, что думают другие о нашем сервисе и как мы можем стать лучше.',
	keywords: ['отзывы', 'Whai', 'платформа', 'мнения', 'пользователи'],
	openGraph: {
		title: 'Отзывы - Whai',
		description:
			'Отзывы пользователей о платформе Whai. Узнайте, как наш сервис помогает другим и что о нем думают.',
		url: 'https://whai.ru/review',
		type: 'website'
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ReviewPage />
}
