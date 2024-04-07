import { NO_INDEX_PAGE, SITE_NAME } from '@/shared/const/seo'
import type { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import SettingsPageAsync from './ui/Settings/settings.async'

export const metadata: Metadata = {
	title: `Settings | ${SITE_NAME}`,
	...NO_INDEX_PAGE,
}

export default function Page({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
	return <SettingsPageAsync />
}
