import type { Metadata } from 'next'
import ConfirmEmailPage from '@/app/confirmEmail/[activationLink]/confirmEmail.page'
import { NO_INDEX_PAGE } from '@/shared/const/seo'

export const metadata: Metadata = {
	title: '',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <ConfirmEmailPage />
}
