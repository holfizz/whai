import { unstable_setRequestLocale } from 'next-intl/server'
import ExampleCoursePage from './(ui)/course.page'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Примеры курсов | Whai'
}
export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <ExampleCoursePage />
}
