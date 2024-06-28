import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SignUpPageAsync from './(ui)/SignUp.async'

export const metadata: Metadata = {
	title: 'Зарегистрировать аккаунт | Whai',
	description: 'Зарегистрировать аккаунт на образовательной платформе Whai',
}
export const dynamic = 'auto'

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	console.log(123123213131, locale)
	unstable_setRequestLocale(locale)
	return <SignUpPageAsync />
}
