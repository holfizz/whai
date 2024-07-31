import { unstable_setRequestLocale } from 'next-intl/server'
import CreatePageAsync from './(ui)/Create.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <CreatePageAsync />
}
