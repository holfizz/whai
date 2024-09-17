'use client'

import { getAllIndependentLessons } from '@/entities/lesson'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/ArrowUpRight'
import ListIcon from '@/shared/assets/icons/List'
import LessonIcon from '@/shared/assets/image/LessonIcon.webp'
import {
	getLessonIndependentRoute,
	getLessonTaskRoute
} from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { Progress } from '@/shared/ui/Progress/Progress'

const LessonSection = () => {
	const { lessonsAllData, loadingAllLesson, errorAllLesson } =
		getAllIndependentLessons()

	if (loadingAllLesson) return <DotsLoader />
	if (errorAllLesson) return <p>Error loading lessons</p>

	return (
		<>
			{lessonsAllData &&
				lessonsAllData.map((lesson, i) => {
					const totalTasks = lesson?.lessonTasks?.length
					const completedTasks = lesson?.lessonTasks?.filter(
						task => task.isChecked
					).length
					const completionPercentage =
						totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
					return (
						<div
							key={i}
							className='shadow-sm rounded-[25px] py-4 px-5 mb-4 w-[390px] h-min-[330px] h-auto max-md:w-full max-md:h-min-[252px] lg:w-1/2 max-sm:w-full bg-white'
						>
							<div className='w-full flex flex-col justify-between items-start'>
								<div className='flex justify-between w-full items-start'>
									<Link href={getLessonIndependentRoute(lesson.id)}>
										<img
											width={100}
											height={100}
											src={LessonIcon.src}
											alt='quiz'
										/>
									</Link>
									<Button
										size='sRound'
										href={getLessonIndependentRoute(lesson.id)}
										isIconOnly
										startContent={<ArrowUpRight fill='var(--color-accents)' />}
										variant='circle'
										as={Link}
										color='main'
									></Button>
								</div>
								<div className='flex flex-col'>
									<Link
										href={getLessonIndependentRoute(lesson.id)}
										className='text-xl font-medium'
									>
										{lesson.name}
									</Link>
									{lesson.description && (
										<p className='text-gray-600 mt-2 w-[390px] line-clamp-3 text-ellipsis overflow-hidden'>
											{lesson.description}
										</p>
									)}
								</div>
							</div>
							{lesson?.lessonTasks?.length > 0 && (
								<Link
									href={getLessonTaskRoute(lesson?.id)}
									className='flex gap-4 text-secondary mt-4 hover:underline'
								>
									<ListIcon />
									<span>ДЗ</span>
								</Link>
							)}
							<div className='mt-4'>
								{lesson?.lessonTasks?.length > 0 && (
									<Progress
										className='w-[390px] h-1 mt-4 rounded-xl max-md:w-full'
										size={'sm'}
										color='peach'
										value={completionPercentage}
									></Progress>
								)}
							</div>
						</div>
					)
				})}
		</>
	)
}

export default LessonSection
