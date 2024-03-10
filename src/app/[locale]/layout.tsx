import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Mulish, Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import '../(styles)/index.scss'
import Body from './body'
const poppinsClass = Poppins({
	subsets: ['latin', 'latin-ext'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
})

const mulishFont = Mulish({
	subsets: ['latin', 'latin-ext'],
	weight: ['200', '300', '400', '500', '600', '700', '800'],
})
// export const metadata: Metadata = {
// 	title: 'wh? - whai',
// 	description: 'Образовательная платформа на основе ИИ',
// }
interface Props {
	params: { locale: string }
	children: React.ReactNode
}
const locales = ['en', 'ru']

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('title'),
	}
}

export function generateStaticParams() {
	return locales.map(locale => ({ locale }))
}
const RootLayout: FC<Props> = ({ children, params: { locale } }) => {
	const messages = useMessages()
	const Local = useLocale()
	unstable_setRequestLocale(locale)
	if (locale !== Local) {
		notFound()
	}
	return (
		<html lang={locale}>
			<head>
				<link rel='icon' href={'/Whai.svg'} sizes='any' />
			</head>
			<Body
				className={[poppinsClass.className, mulishFont.className].join(' ')}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</Body>
		</html>
	)
}
export default RootLayout
