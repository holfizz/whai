'use client'

import { IUser } from '@/entities/Auth'
import { ICourse } from '@/entities/course'
import { Link } from '@/navigation'
import LockIcon from '@/shared/assets/icons/Lock'
import PlusIcon from '@/shared/assets/icons/Plus'
import {
	getCreatePageRoute,
	getSubscriptionsRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
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
			className={`relative flex justify-between max-md:flex-wrap gap-4 w-full ${className}`}
		>
			{filteredCourses?.length > 0 ? (
				filteredCourses.map((course, i) => {
					const isCourseLocked = course?.isTrial && !userData?.isTrial

					return (
						<>
							<div className={`w-full ${isCourseLocked && 'blur-xl'}`}>
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
				<>
					{userData?.isTrial || userData?.activeSubscription?.isActive ? (
						<Link
							className='shadow-sm w-[390px] min-h-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 max-sm:w-full flex items-center justify-center rounded-3xl flex-col gap-4 cursor-pointer'
							href={getCreatePageRoute()}
						>
							<PlusIcon fontSize={28}></PlusIcon>
							<p className='text-sm max-640:text-lg text-secondary'>
								{t('You dont have any courses, start creating them')}
							</p>
						</Link>
					) : (
						<Link
							className='shadow-sm w-[390px] min-h-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 max-sm:w-full flex items-center justify-center rounded-3xl flex-col gap-4 cursor-pointer'
							href={getSubscriptionsRoute()}
						>
							<Button
								className='rounded-2xl'
								color='accent'
								as={Link}
								href={getSubscriptionsRoute()}
							>
								{t('Activate subscription')}
							</Button>
							<p className='text-sm max-640:text-lg text-secondary text-center w-[80%]'>
								{!userData?.isTrialUsed
									? t(
											'To create a course you need a subscription, you can activate the test one by clicking on the button'
									  )
									: t(
											'To create a course, a subscription is required, you can activate it by clicking on the button'
									  )}
							</p>
						</Link>
					)}
				</>
			)}
		</div>
	)
}
