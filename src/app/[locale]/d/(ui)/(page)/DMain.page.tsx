'use client'

import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import PageHeader from '@/app/[locale]/d/(ui)/pageHeader/pageHeader'
import PageBody from '@/app/[locale]/d/(ui)/pageBody/pageBody'

export default function DMain() {
	const t = useTranslations('Dashboard')
	const { userData } = useGetProfile()

	return (
		<DashboardLayout className={'w-full'}>
			<PageHeader userData={userData} />
			<PageBody />
		</DashboardLayout>
	)
}
