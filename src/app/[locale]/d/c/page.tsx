import { unstable_setRequestLocale } from 'next-intl/server'
import CoursesPageAsync from '@/app/[locale]/d/c/coursesPage.async'

export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <CoursesPageAsync />
}
