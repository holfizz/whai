import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ForgotPasswordPage from './(ui)/ForgotPassword.page'

export const metadata: Metadata = {
	title: 'Восстановление пароля | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ForgotPasswordPage />
}
