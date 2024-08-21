import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import AboutPage from './(ui)/About.page'

export const metadata: Metadata = {
	title: 'О нас | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <AboutPage />
}
