import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import ExampleCoursePage from './(ui)/course.page'
export const metadata: Metadata = {
	title: 'Примеры курсов'
}
export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <ExampleCoursePage />
}
