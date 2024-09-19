'use client'

import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { useGetAllCourses } from '@/entities/course'
import { Link } from '@/navigation'
import LockIcon from '@/shared/assets/icons/Lock'
import { getSubscriptionsRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { useTranslations } from 'next-intl'
import { ENGLISH_COURSE_A1_TO_B1 } from '../../../(model)/static-course.data'

const CourseSection = () => {
	const { allCourseData, loadingAllCourse, errorAllCourse } = useGetAllCourses()
	const { userData } = useGetProfile()
	const t = useTranslations('Dashboard')

	if (errorAllCourse) return <p>Error loading courses</p>
	if (loadingAllCourse) return <DotsLoader />

	return (
		<div className='relative flex flex-wrap gap-4'>
			{allCourseData &&
				[...allCourseData, ENGLISH_COURSE_A1_TO_B1].map((course, i) => {
					const isCourseLocked = course?.isTrial && !userData?.isTrial
					// const isCourseLocked = true

					return (
						<div key={i} className='relative'>
							<div className={`${isCourseLocked ? 'blur-xl' : ''}`}>
								<CourseCard isSquare course={course as any} />
							</div>
							{isCourseLocked && (
								<>
									<div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center w-full h-full z-10 rounded-3xl'>
										<div className='flex flex-col items-center'>
											<LockIcon />
											<h2 className='text-xl font-bold'>{t('Blocked')}</h2>
											<p className='text-center w-[80%]'>
												{t('You used the trial period to unlock, subscribe')}
											</p>
											<Button
												color='accent'
												as={Link}
												className='mt-4 rounded-xl'
												href={getSubscriptionsRoute()}
											>
												{t('Subscribe')}
											</Button>
										</div>
									</div>
									<div className='absolute inset-0 bg-transparent pointer-events-none z-30 blur-xl rounded-3xl'></div>
								</>
							)}
						</div>
					)
				})}
		</div>
	)
}

export default CourseSection
