'use client'

import { useTranslations } from 'next-intl'
import Text, { TextSize } from '@/shared/ui/Text/Text'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import cls from './coursesPage.module.scss'
import { useGetAllCourses } from '@/entities/course'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'

const CoursesPage = () => {
	const t = useTranslations('CoursesPage')
	const { allCourseData } = useGetAllCourses()
	return (
		<DashboardLayout>
			<Text
				size={TextSize.XL}
				title={t('My courses')}
				classNameText={cls.text}
				text={t('Library of all courses')}
			/>
			<div className={'flex flex-wrap gap-5 w-full  items-center'}>
				{allCourseData &&
					allCourseData.map((course, i) => (
						<CourseCard isSquare course={course} key={i} />
					))}
			</div>
		</DashboardLayout>
	)
}

export default CoursesPage
