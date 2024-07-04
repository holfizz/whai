import {Metadata} from 'next'
import {unstable_setRequestLocale} from 'next-intl/server'
import DMainAsync from './(ui)/DMain.async'

export const metadata: Metadata = {
	title: 'Dashboard | Whai',
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <DMainAsync />
}
