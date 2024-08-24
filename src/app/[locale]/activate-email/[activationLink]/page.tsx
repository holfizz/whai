import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ActivateEmailPage from './(ui)/ActivateEmail.page'

export const metadata: Metadata = {
	title: 'Активация аккаунта | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ActivateEmailPage />
}
