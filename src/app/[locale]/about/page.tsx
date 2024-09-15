import EnglishImage from '@/shared/assets/image/EnglishCourseAvatar.webp'
import MathImage from '@/shared/assets/image/MathCourseAvatar.webp'
import UniversalLifeImage from '@/shared/assets/image/UniversalLife.webp'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import AboutPage from './(ui)/About.page'

export const metadata: Metadata = {
	title: 'О нас',
	description:
		'Узнайте больше о платформе Whai — наши миссия, цели и ценности.',
	keywords: ['о нас', 'Whai', 'миссия', 'ценности', 'образование'],
	openGraph: {
		title: 'О нас - Whai',
		description: 'Познакомьтесь с миссией и целями платформы Whai.',
		url: 'https://whai.ru/about',
		type: 'website',
		images: [
			{
				url: UniversalLifeImage.src,
				alt: 'UniversalLifeImage'
			},
			{
				url: EnglishImage.src,
				alt: 'EnglishCourseAvatar'
			},
			{
				url: MathImage.src,
				alt: 'MathCourseAvatar'
			}
		]
	}
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <AboutPage />
}
