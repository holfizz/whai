import {unstable_setRequestLocale} from 'next-intl/server'
import MainPageAsync from './(mainPage)/main.async'

export default function IndexPage({
	params: { locale },
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <MainPageAsync />
}
