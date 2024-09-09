import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import MainPageAsync from './(mainPage)/main.async'

export const metadata: Metadata = {
	title: 'WHAI - Безграничное обучение с искусственным интеллектом',
	description:
		'Откройте новую эру образования с WHAI - инновационной платформой обучения на основе ИИ. Персонализированные курсы, адаптивные программы и интерактивные уроки помогут вам раскрыть свой потенциал. Испытайте силу AI в образовании уже сегодня!',
	keywords:
		'WHAI, образовательная платформа, искусственный интеллект, ИИ в обучении, AI образование, персонализированное обучение, онлайн курсы, адаптивное образование',
	openGraph: {
		title: 'WHAI - Безграничное обучение с искусственным интеллектом',
		description:
			'Откройте новую эру образования с WHAI - инновационной платформой обучения на основе ИИ. Персонализированные курсы, адаптивные программы и интерактивные уроки помогут вам раскрыть свой потенциал. Испытайте силу AI в образовании уже сегодня!',
		type: 'website',
		locale: 'ru_RU',
		siteName: 'WHAI'
	}
}

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <MainPageAsync />
}
