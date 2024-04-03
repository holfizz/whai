import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Chat with AI',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <div></div>
}