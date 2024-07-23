import { unstable_setRequestLocale } from 'next-intl/server'
import CreateCoursePageAsync from './(ui)/CreateCourse.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <CreateCoursePageAsync />
}
