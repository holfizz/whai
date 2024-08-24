import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import CookiePolicyPage from './(ui)/CookiePolicy.page'

export const metadata: Metadata = {
	title: 'Оферта | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <CookiePolicyPage />
}
