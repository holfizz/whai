import CoursesPageAsync from '@/app/[locale]/d/c/coursesPage.async'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <CoursesPageAsync />
}
