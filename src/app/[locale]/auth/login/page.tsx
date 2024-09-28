import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import LoginPage from './(ui)/Login.page'

export const metadata: Metadata = {
	title: 'Войти в аккаунт',
	description: 'Войти в аккаунт на образовательной платформе Whai'
}

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <LoginPage />
}
