'use client'

import ErrorImage from '@/shared/assets/images/404.webp'
import { NO_INDEX_PAGE } from '@/shared/const/seo'
import Logo from '@/shared/ui/Logo/Logo'
import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import cls from './not-found.module.scss'

export const metadata: Metadata = {
	title: 'Page not found',
	description: 'Page was not found - Error 404',
	...NO_INDEX_PAGE,
}

export default function Page() {
	const { t } = useTranslation('errorPage')
	return (
		<div className={cls.errorPage}>
			<header className={cls.header}>
				<div className={cls.headerContainer}>
					<Logo className={cls.logo}></Logo>
				</div>
			</header>
			<h1 className={cls.errorTitle}>{t("This page doesn't exist")}</h1>
			<Image className={cls.errorImage} src={ErrorImage} alt='404' />
		</div>
	)
}
