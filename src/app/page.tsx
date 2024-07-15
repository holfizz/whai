import { unstable_setRequestLocale } from 'next-intl/server'

export default function RootPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)
}

export async function generateStaticParams() {
	return ['en', 'ru'].map(locale => ({ locale }))
}
