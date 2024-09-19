'use client'

import { IUser } from '@/entities/Auth'
import { ICourse } from '@/entities/course'
import { Link } from '@/navigation'
import LockIcon from '@/shared/assets/icons/Lock'
import { getSubscriptionsRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
import Text, { TextTheme } from '@/shared/ui/Text/Text'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export default function BodyCards({
	data,
	loading,
	className,
	userData
}: {
	data: ICourse[]
	loading: boolean
	className?: string
	userData?: IUser
}) {
	if (loading) {
		return (
			<div className={`flex gap-5 `}>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
				<Skeleton className='w-[390px] h-[330px] md:w-[353px] md:h-[252px] rounded-lg'></Skeleton>
			</div>
		)
	}
	const filteredCourses = data?.slice(0, 3)
	const t = useTranslations('Dashboard')

	return (
		<div
			className={`relative flex justify-between max-md:flex-wrap gap-4 ${className}`}
		>
			{filteredCourses ? (
				filteredCourses.map((course, i) => {
					const isCourseLocked = course?.isTrial && !userData?.isTrial

					return (
						<>
							<div className={`${isCourseLocked && 'blur-xl'}`}>
								<CourseCard
									className='!w-full !max-w-[390px]'
									course={course}
								/>
							</div>
							{isCourseLocked && (
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
							)}
							{isCourseLocked && (
								<div className='absolute inset-0 bg-transparent pointer-events-none blur-xl rounded-3xl'></div>
							)}
						</>
					)
				})
			) : (
				<Text theme={TextTheme.ERROR} title={t('No courses found')}></Text>
			)}
		</div>
	)
}
