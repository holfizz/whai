'use client'

import BodyCards from '@/app/[locale]/d/(ui)/pageBody/bodyCard/bodyCards'
import { useGetAllCourses } from '@/entities/course/'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import { getCoursesRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import Text from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function PageBody() {
	const t = useTranslations('Dashboard')
	const { allCourseData, loadingAllCourse } = useGetAllCourses()
	return (
		<div className='w-[800px] max-lg:w-[80vw] mt-16 '>
			<div className='flex justify-between'>
				<Text title={t('Recommendations')} className={'mb-5'} />
				<Button
					color={'clear'}
					className={'text-[var(--secondary-color)]'}
					endContent={<ArrowUpRight fill='#fff' />}
					as={Link}
					href={getCoursesRoute()}
				>
					{t('View all')}
				</Button>
			</div>
			<BodyCards data={allCourseData} loading={loadingAllCourse} />
		</div>
	)
}
