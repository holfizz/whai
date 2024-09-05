import { locales } from '@/navigation'
import EnglishImage from '@/shared/assets/image/EnglishCourseAvatar.png'
import MathImage from '@/shared/assets/image/MathCourseAvatar.png'
import UniversalLifeImage from '@/shared/assets/image/UniversalLife.png'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { FC } from 'react'
import '../(styles)/index.scss'
import Body from './body'
const UbuntuSans = Inter({
	subsets: ['latin', 'latin-ext', 'cyrillic'],
	weight: ['300', '400', '500', '700']
})
interface Props {
	params: { locale: string }
	children: React.ReactNode
}
export const metadata: Metadata = {
	title: {
		absolute: 'Whai',
		template: '%s | Whai'
	},
	viewport: { width: 'device-width', initialScale: 1 },
	icons: {
		icon: '/Whai.svg',
		shortcut: '/Whai.svg',
		apple: '/Whai.svg',
		other: {
			rel: 'touch-icons',
			url: '/Whai.svg',
			sizes: '96x96',
			type: 'image/svg'
		}
	},
	manifest: '../manifest.json',
	themeColor: '#ffe8a3',
	metadataBase: new URL('https://whai.ru'),
	alternates: {
		canonical: 'https://whai.ru',
		languages: {
			ru: 'https://whai.ru/ru',
			en: 'https://whai.ru/en'
		}
	},
	verification: {
		google: 'dkY7WO7mF-PjULK_lbauz8QqX2_ly2vz2m_0R6zbOsc',
		yandex: '85d33aba9b692229'
	},
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'Whai',
		emails: 'support@whai.ru',
		images: [
			{
				url: UniversalLifeImage.src,
				alt: 'UniversalLifeImage'
			},
			{
				url: EnglishImage.src,
				alt: 'EnglishImage'
			},
			{
				url: MathImage.src,
				alt: 'EnglishImage'
			}
		]
	}
}
export const viewport: Viewport = {
	themeColor: '#ffe8a3',
	width: 'device-width',
	initialScale: 1
}
export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
const LocaleLayout: FC<Props> = ({ children, params: { locale } }) => {
	unstable_setRequestLocale(locale)

	const messages = useMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
			<GoogleTagManager gtmId='GTM-TCX82LS8' />
			<Body className={UbuntuSans.className}>
				<NextIntlClientProvider messages={messages} locale={locale}>
					{children}
				</NextIntlClientProvider>
			</Body>
			<GoogleAnalytics gaId='G-TCX82LS8' />
		</html>
	)
}
export default LocaleLayout
