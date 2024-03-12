import { Metadata } from 'next'
import LoginPageAsync from './ui/Login.async'

export const metadata: Metadata = {
	title: 'Войти в аккаунт | Whai',
	description: 'Войти в аккаунт на образовательной платформе Whai',
}

export default function Page() {
	return <LoginPageAsync />
}
