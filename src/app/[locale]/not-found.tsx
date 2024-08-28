import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'

export const metadata: Metadata = {
	title: 'Page not found',
	description: 'Page was not found - Error 404',
	...NO_INDEX_PAGE
}

export default function NotFoundPage() {
	const t = useTranslations('Lesson')
	return (
		<div>
			<h1>sdsd</h1>
			<h1>sdsd</h1>
			<h1>sdsd</h1>
			<h1>sdsd</h1>
		</div>
	)
}
