import { unstable_setRequestLocale } from 'next-intl/server'
import LessonPageAsync from './(ui)/IndependentLesson.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <LessonPageAsync />
}
