import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import LoginPage from './ui/Login.page'

export const metadata: Metadata = {
	title: 'Войти в аккаунт | Whai',
	description: 'Войти в аккаунт на образовательной платформе Whai',
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <LoginPage />
}
