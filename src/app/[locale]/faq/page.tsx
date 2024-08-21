import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import FAQPage from './(ui)/FAQ.page'

export const metadata: Metadata = {
	title: 'FAQ | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <FAQPage />
}
