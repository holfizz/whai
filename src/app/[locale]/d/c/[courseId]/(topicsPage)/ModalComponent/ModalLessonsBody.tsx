import { useGetAllLessons } from '@/entities/lesson'
import { useGetAllQuizzes } from '@/entities/quiz'
import { useGetSubtopic } from '@/entities/subtopic'
import { Link } from '@/navigation'
import ArrowUpRight from '@/shared/assets/icons/Arrows/Outline/ArrowUpRight'
import { getLessonRoute, getQuizRoute } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ModalBody } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { FiCheck } from 'react-icons/fi'
import cls from './ModalComponent.module.scss'

const ModalLessonsBody = ({ selectedSubtopicId }) => {
	const { lessonsAllData } = useGetAllLessons(selectedSubtopicId)
	const { quizzesAllData } = useGetAllQuizzes(selectedSubtopicId)
	const { subtopicData } = useGetSubtopic(selectedSubtopicId)
	const t = useTranslations('TopicsPage')

	return (
		<ModalBody>
			<div>
				<h1 className='text-3xl font-semibold text-accent'>
					{subtopicData?.name}
				</h1>
				<p>{subtopicData?.description}</p>
			</div>
			<div>
				<div>
					{lessonsAllData &&
						lessonsAllData.map((lesson, index) => (
							<div key={index} className='flex mt-3'>
								<div
									className={`${cls.group} ${
										lesson.isHasLessonTask ? 'calc(100% - 90px)' : ''
									} flex items-center`}
									key={lesson.id}
								>
									<Link
										href={getLessonRoute(lesson.id)}
										className='absolute border-2 border-decor-3 h-[44px] rounded-xl flex items-center px-6 z-20 justify-between'
										style={{
											width: lesson.isHasLessonTask
												? 'calc(100% - 15px)'
												: '100%'
										}}
									>
										<h1 className='w-[40%] text-nowrap text-ellipsis overflow-hidden'>
											{lesson.name}
										</h1>
										<ArrowUpRight
											className={cls.icon}
											color='var(--color-accent)'
										/>
									</Link>
								</div>
								{lesson.isHasLessonTask && (
									<div
										className={cls.task}
										style={{
											background: lesson.lessonTasks.some(
												task => task.isChecked
											)
												? 'var(--color-decor-3)'
												: 'transparent'
										}}
									>
										{t('Task')}
									</div>
								)}
							</div>
						))}
					<h3 className='mt-4'>{t('Tests')}</h3>
					{quizzesAllData &&
						quizzesAllData.map((quiz, index) => (
							<div
								className={classNames(cls.group, {}, ['mt-3'])}
								key={quiz.id}
							>
								<div
									style={{ width: `${quiz.totalPercents}%` }}
									className='absolute b-0 bg-decor-3 h-[44px] rounded-xl'
								></div>
								<Link
									href={getQuizRoute(quiz.id)}
									className='absolute b-0 border-2 border-decor-3 h-[44px] w-full rounded-xl flex items-center px-6 z-20 justify-between'
								>
									<h1 className='w-[40%] text-nowrap text-ellipsis overflow-hidden'>
										{quiz.name}
									</h1>
									<ArrowUpRight
										className={cls.icon}
										color='var(--color-accent)'
									/>
									{quiz.totalPercents === 100 && (
										<FiCheck className={cls.checkIcon} />
									)}
								</Link>
							</div>
						))}
				</div>
			</div>
		</ModalBody>
	)
}

export default ModalLessonsBody
