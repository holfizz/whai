import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SubsPageAsync from './(ui)/Subs.async'

export const metadata: Metadata = {
	title: 'Dashboard | Whai'
}

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SubsPageAsync />
}
