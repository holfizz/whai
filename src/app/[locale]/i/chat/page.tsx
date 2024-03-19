import { NO_INDEX_PAGE } from '@/shared/const/seo'
import type { Metadata } from 'next'
import ChatPageAsync from './ui/chat/chat.async'

export const metadata: Metadata = {
	title: '',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <ChatPageAsync />
}
