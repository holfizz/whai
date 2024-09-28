import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import LessonTaskPageAsync from './(ui)/LessonTask.async'
export const metadata: Metadata = {
	title: 'Домашние задание'
}
export default function IndexPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	unstable_setRequestLocale(locale)

	return <LessonTaskPageAsync />
}
