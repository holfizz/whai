import '@/app/(styles)/index.scss'
import Body from '@/app/body'
import type { Metadata } from 'next'
import { Mulish, Poppins } from 'next/font/google'
import '../shared/config/i18n/i18n'

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
function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<head>
				<link rel='icon' href={'/Whai.svg'} sizes='any' />
			</head>
			<Body
				className={[poppinsClass.className, mulishFont.className].join(' ')}
			>
				{children}
			</Body>
		</html>
	)
}

export default RootLayout
