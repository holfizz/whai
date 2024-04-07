import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Chat with AI',
	...NO_INDEX_PAGE,
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <div></div>
}
