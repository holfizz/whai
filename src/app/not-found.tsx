'use client'

import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { useTranslation } from 'react-i18next'
import Text, { TextTheme } from '@/shared/ui/Text/Text'

export const metadata: Metadata = {
	title: 'Page not found',
	description: 'Page was not found - Error 404',
	...NO_INDEX_PAGE,
}

export default function Page() {
	const { t } = useTranslation('errorPage')
	return (
		<div className={'errorPage'}>
			<Text
				theme={TextTheme.ERROR}
				title={`404 | ${t('The page was not found. Please go to the main page')}`}
			/>
		</div>
	)
}
