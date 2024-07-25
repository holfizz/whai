import { unstable_setRequestLocale } from 'next-intl/server'
import QuizPageAsync from './(ui)/Quiz.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <QuizPageAsync />
}
