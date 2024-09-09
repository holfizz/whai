import { locales } from '@/navigation'
import EnglishImage from '@/shared/assets/image/EnglishCourseAvatar.png'
import MathImage from '@/shared/assets/image/MathCourseAvatar.png'
import UniversalLifeImage from '@/shared/assets/image/UniversalLife.png'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Metadata, Viewport } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { FC } from 'react'
import '../(styles)/index.scss'
import Body from './body'

const SrbijaSans = localFont({ src: '../../../public/Srbija_Sans.ttf' })

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
		icon: '/Whai_logo.svg',
		shortcut: '/Whai_logo.svg',
		apple: '/Whai_logo.svg',
		other: {
			rel: 'touch-icons',
			url: '/Whai_logo96x96.svg',
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
		google: process.env.GOOGLE_VERIFICATION,
		yandex: process.env.YANDEX_VERIFICATION
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
			<Body className={`${UbuntuSans.className} ${SrbijaSans.className}`}>
				<NextIntlClientProvider messages={messages} locale={locale}>
					{children}
				</NextIntlClientProvider>
			</Body>
			<GoogleAnalytics gaId='G-TCX82LS8' />
		</html>
	)
}
export default LocaleLayout
