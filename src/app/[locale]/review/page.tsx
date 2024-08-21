import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ReviewPage from './(ui)/Review.page'

export const metadata: Metadata = {
	title: 'Отзывы | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <ReviewPage />
}
