'use client'
import { useTranslation } from 'next-i18next'

export default function Page() {
	const {t} = useTranslation()
	return <div>
		<h1>{t('asd')}</h1>
	</div>
}
