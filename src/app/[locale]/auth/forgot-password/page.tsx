import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ForgotPasswordPageAsync from './ui/forgotPassword.async'

export const metadata: Metadata = {
	title: 'Восстановить пароль - whai',
	...NO_INDEX_PAGE,
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ForgotPasswordPageAsync />
}
