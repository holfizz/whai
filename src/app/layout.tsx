import { unstable_setRequestLocale } from 'next-intl/server'
import { ReactNode } from 'react'
import './(styles)/index.scss'

const RootLayout = ({
	children,
	params: { locale },
}: {
	children: ReactNode
	params: { locale: string }
}) => {
	unstable_setRequestLocale(locale)

	return children
}

export default RootLayout
