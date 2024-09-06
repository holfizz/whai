import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import DMainAsync from './(ui)/(page)/DMain.async'

export const metadata: Metadata = {
	title: 'Панель управления',
	description:
		'Панель управления для управления вашими данными и настройками на платформе Whai.',
	keywords: ['панель управления', 'Whai', 'настройки', 'управление'],
	openGraph: {
		title: 'Панель управления - Whai',
		description: 'Управляйте своими данными и настройками на платформе Whai.',
		url: 'https://whai.ru/management',
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
	return <DMainAsync />
}
