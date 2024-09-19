import { unstable_setRequestLocale } from 'next-intl/server'
import AdmpPage from './(ui)/Admin.page'

export default function Page({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <AdmpPage />
}
