import { unstable_setRequestLocale } from 'next-intl/server'
import TopicsPageAsync from './(topicsPage)/(ui)/topicsPage.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <TopicsPageAsync />
}
