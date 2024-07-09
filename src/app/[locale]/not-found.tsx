import {NO_INDEX_PAGE} from '@/shared/const/seo'
import type {Metadata} from 'next'
import cls from './not-found.module.scss'

export const metadata: Metadata = {
	title: 'Page not found',
	description: 'Page was not found - Error 404',
	...NO_INDEX_PAGE,
}

export default function IndexPage() {
	return <div className={cls.errorPage}>not found</div>
}
