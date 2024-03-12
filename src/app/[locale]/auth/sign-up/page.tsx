import { Metadata } from 'next'
import SignUpPageAsync from './ui/SignUp.async'

export const metadata: Metadata = {
	title: 'Зарегистрировать аккаунт | Whai',
	description: 'Зарегистрировать аккаунт на образовательной платформе Whai',
}

export default function Page() {
	return <SignUpPageAsync />
}
