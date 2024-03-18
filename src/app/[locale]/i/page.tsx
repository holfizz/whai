import { NO_INDEX_PAGE } from '@/shared/const/seo'
import { DashboardLayout } from '@/widgets/DashboardLayout/ui/DashboardLayout/DashboardLayout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE,
}

export default function Page() {
	return <DashboardLayout>dashboard</DashboardLayout>
}
