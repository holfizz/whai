import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import PrivacyPolicyPage from './(ui)/Privacy.page'

export const metadata: Metadata = {
	title: 'Оферта | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <PrivacyPolicyPage />
}
