import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Mulish, Poppins } from 'next/font/google'
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
export const metadata: Metadata = {
	title: 'wh? - whai',
	description: 'Образовательная платформа на основе ИИ',
}
interface Props {
	params: { locale: string }
	children: React.ReactNode
}

const RootLayout: FC<Props> = ({ children, params: { locale } }) => {
	const messages = useMessages()
	return (
		<html lang={locale}>
			<head>
				<link rel='icon' href={'/Whai.svg'} sizes='any' />
			</head>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<Body
					locale={locale}
					className={[poppinsClass.className, mulishFont.className].join(' ')}
				>
					{children}
				</Body>
			</NextIntlClientProvider>
		</html>
	)
}
export default RootLayout
