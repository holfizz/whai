import {Metadata} from 'next'
import SignUpPageAsync from './(ui)/SignUp.async'
import {unstable_setRequestLocale} from "next-intl/server";

export const metadata: Metadata = {
	title: 'Зарегистрировать аккаунт | Whai',
	description: 'Зарегистрировать аккаунт на образовательной платформе Whai',
}

export default function IndexPage({params: {locale}}) {
	unstable_setRequestLocale(locale)

	return <SignUpPageAsync />
}
