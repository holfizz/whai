import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import MainPageAsync from './(mainPage)/main.async'

export const metadata: Metadata = {
	title: 'Главная страница | Whai',
	description:
		'Добро пожаловать на образовательную платформу Whai, где искусственный интеллект помогает вам достигать новых высот в обучении. Откройте для себя уникальные курсы и ресурсы, разработанные специально для вашего успеха.'
}

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <MainPageAsync />
}
