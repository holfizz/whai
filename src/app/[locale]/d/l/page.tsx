import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import LibraryPageAsync from './(ui)/libraryPage.async'
export const metadata: Metadata = {
	title: 'Библиотека | Whai'
}

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <LibraryPageAsync />
}
