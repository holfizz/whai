'use client'

import Text from '@/shared/ui/Text/Text'
import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/Button/Button'
import Icon from '@/shared/ui/Icon/Icon'
import { ArrowUpRight } from 'lucide-react'
import { useGetAllCourses } from '@/entities/course/model/course.queries'
import BodyCards from '@/app/[locale]/d/(ui)/pageBody/bodyCard/bodyCards'
import Link from 'next/link'
import { getCoursesRoute } from '@/shared/const/router'

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
					endContent={<Icon SVG={ArrowUpRight} />}
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
