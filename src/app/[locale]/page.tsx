import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import MainPageAsync from './(mainPage)/main.async'

export const metadata: Metadata = {
	title: 'Главная страница | whai',
	description: 'Главная страница образовательной платформы whai на основе ИИ'
}

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <MainPageAsync />
}
