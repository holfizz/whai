import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import cls from './not-found.module.scss'

export const metadata: Metadata = {
	title: 'Page not found',
	description: 'Page was not found - Error 404',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return (
		<div className={cls.errorPage}>
			{/* <header className={cls.header}>
				<div className={cls.headerContainer}></div>
			</header>
			<h1 className={cls.errorTitle}>{"t('This page doesn't exist')"}</h1>
			<Image className={cls.errorImage} src={ErrorImage} alt='404' /> */}
			not found
		</div>
	)
}
