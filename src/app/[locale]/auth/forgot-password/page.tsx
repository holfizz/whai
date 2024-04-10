import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import ForgotPasswordPageAsync from './ui/forgotPassword.async'

export const metadata: Metadata = {
	title: 'Восстановить пароль - whai',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <ForgotPasswordPageAsync />
}
