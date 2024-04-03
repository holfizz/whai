import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { Metadata } from 'next'
import ResetPasswordPageAsync from './ui/resetPassword.async'

export const metadata: Metadata = {
	title: 'Подтверждение почты - whai',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <ResetPasswordPageAsync />
}
