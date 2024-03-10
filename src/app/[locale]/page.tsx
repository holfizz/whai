'use client'

import { useTranslations } from 'next-intl'
import MainPageAsync from './(mainPage)/main.async'
export default function Page() {
	const t = useTranslations('mainPage')

	return <MainPageAsync />
}
