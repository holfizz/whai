import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ActivateEmailPage from './(ui)/ResetPassword.page'

export const metadata: Metadata = {
	title: 'Сброс пароля | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ActivateEmailPage />
}
