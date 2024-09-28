import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SignUpPageAsync from './(ui)/SignUp.async'

export const metadata: Metadata = {
	title: 'Зарегистрировать аккаунт',
	description: 'Зарегистрировать аккаунт на образовательной платформе Whai'
}

export default function IndexPage({ params: { locale } }) {
	unstable_setRequestLocale(locale)

	return <SignUpPageAsync />
}
