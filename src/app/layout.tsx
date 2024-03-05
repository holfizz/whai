import '@/app/(styles)/index.scss'
import Body from '@/app/body'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '../shared/config/i18n/i18n'

const fontClass = Poppins({
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
				<link rel='icon' href={'/whai.svg'} sizes='any' />
			</head>
			<Body className={fontClass.className}>{children}</Body>
		</html>
	)
}

export default RootLayout
