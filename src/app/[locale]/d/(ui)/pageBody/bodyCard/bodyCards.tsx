'use client'

import { ICourse } from '@/entities/course'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
import Text, { TextTheme } from '@/shared/ui/Text/Text'

export default function BodyCards({
	data,
	loading
}: {
	data: ICourse[]
	loading: boolean
}) {
	if (loading) {
		return (
			<div className={'flex gap-5'}>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
			</div>
		)
	}
	const filteredCourses = data?.slice(1, 3)
	const t = useTranslations('Dashboard')
	return (
		<div className={'flex justify-between max-md:flex-wrap gap-4'}>
			{filteredCourses ? (
				filteredCourses.map((course, i) => (
					<CourseCard course={course} key={i} />
				))
			) : (
				<Text theme={TextTheme.ERROR} title={t('No courses found')}></Text>
			)}
		</div>
	)
}
