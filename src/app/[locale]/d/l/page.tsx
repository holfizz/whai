import { unstable_setRequestLocale } from 'next-intl/server'
import LibraryPageAsync from './(ui)/libraryPage.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <LibraryPageAsync />
}
