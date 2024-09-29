import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { URL } from 'url'
import ContactsPage from './(ui)/Contacts.page'

export const metadata: Metadata = {
	title: 'Контакты',
	description:
		'Свяжитесь с нами для получения дополнительной информации о платформе Whai. Мы всегда рады помочь вам.',
	keywords: ['контакты', 'поддержка', 'Whai', 'связь'],
	openGraph: {
		title: 'Контакты - Whai',
		description:
			'Найдите все способы связи с нашей командой на платформе Whai.',
		url: new URL('/contacts', 'https://whai.ru/ru').toString(),
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
	return <ContactsPage />
}
