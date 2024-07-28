'use client'

import PageBody from '@/app/[locale]/d/(ui)/pageBody/pageBody'
import PageHeader from '@/app/[locale]/d/(ui)/pageHeader/pageHeader'
import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import useCourseStore from '../../c/create/(model)/create-page.store'

export default function DMain() {
	const t = useTranslations('Dashboard')
	const { userData } = useGetProfile()
	const { resetState } = useCourseStore()
	useEffect(() => resetState(), [resetState])
	return (
		<DashboardLayout className={'w-full'}>
			<PageHeader userData={userData} />
			<PageBody />
		</DashboardLayout>
	)
}
