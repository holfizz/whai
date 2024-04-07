import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ConfirmEmailPageAsync from './(ui)/confirmEmail.async'

export const metadata: Metadata = {
	title: 'Подтверждение почты - whai',
	...NO_INDEX_PAGE,
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ConfirmEmailPageAsync />
}
