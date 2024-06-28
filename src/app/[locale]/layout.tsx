import { locales } from '@/navigation'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Ubuntu } from 'next/font/google'
import { FC } from 'react'
import '../(styles)/index.scss'
import Body from './body'

const UbuntuSans = Ubuntu({
	subsets: ['latin', 'latin-ext', 'cyrillic'],
	weight: ['300', '400', '500', '700'],
})
interface Props {
	params: { locale: string }
	children: React.ReactNode
}
export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}

const LocaleLayout: FC<Props> = ({ children, params: { locale } }) => {
	unstable_setRequestLocale(locale)

	const messages = useMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link rel='icon' href={'/Whai.svg'} sizes='any' />
			</head>
			<Body className={UbuntuSans.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</Body>
		</html>
	)
}
export default LocaleLayout
