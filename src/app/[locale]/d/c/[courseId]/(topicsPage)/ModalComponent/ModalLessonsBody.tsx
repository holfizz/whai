import cls from './ModalComponent.module.scss'
import { ArrowUpRight } from 'lucide-react'
import { FiCheck } from 'react-icons/fi'
import { useGetAllLessons } from '@/entities/lesson'
import { useGetSubtopic } from '@/entities/subtopic'
import { ModalBody } from '@nextui-org/react'
import { useGetAllQuizzes } from '@/entities/quiz'
import { useTranslations } from 'next-intl'
import { getLessonRoute } from '@/shared/const/router'
import { Link } from '@/navigation'

const ModalLessonsBody = ({ selectedSubtopicId }) => {
	const { lessonsAllData } = useGetAllLessons(selectedSubtopicId)
	const { quizzesAllData } = useGetAllQuizzes(selectedSubtopicId)
	const { subtopicData } = useGetSubtopic(selectedSubtopicId)
	const t = useTranslations('TopicsPage')
	return (
		<ModalBody>
			<div>
				<h1 className={'text-3xl font-semibold text-accent'}>
					{subtopicData?.name}
				</h1>
				<p>{subtopicData?.description}</p>
			</div>
			<div>
				<div>
					{lessonsAllData &&
						lessonsAllData.map((lesson, index) => (
							<div className={'flex mt-3'}>
								<div
									className={`${cls.group} ${lesson.isHasLessonTask ? 'calc(100% - 90px)' : ''} flex items-center`}
									key={lesson.id}
								>
									<Link
										href={getLessonRoute(lesson.id)}
										className={`absolute border-1 border-decor-3 h-[44px] rounded-xl flex items-center px-6 z-20 justify-between`}
										style={{
											width: lesson.isHasLessonTask
												? 'calc(100% - 15px)'
												: '100%'
										}}
									>
										<h1
											className={
												'w-[40%] text-nowrap text-ellipsis overflow-hidden'
											}
										>
											{lesson.name}
										</h1>
										<ArrowUpRight
											className={cls.icon}
											color={'var(--color-accent)'}
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
					<h3 className={'mt-4'}>{t('Tests')}</h3>
					{quizzesAllData &&
						quizzesAllData.map((quiz, index) => (
							<div className={cls.group} key={quiz.id}>
								<div
									className={`absolute b-0 bg-decor-3 h-[44px] rounded-xl w-[${quiz.totalPercents}%]`}
								></div>
								<div
									className={
										'absolute b-0 border-1 border-decor-3 h-[44px] w-full rounded-xl flex items-center px-6 z-20 justify-between'
									}
								>
									<h1
										className={
											'w-[40%] text-nowrap text-ellipsis overflow-hidden'
										}
									>
										{quiz.name}
									</h1>
									<ArrowUpRight
										className={cls.icon}
										color={'var(--color-accent)'}
									/>
									{quiz.totalPercents === 100 && (
										<FiCheck className={cls.checkIcon} />
									)}
								</div>
							</div>
						))}
				</div>
			</div>
		</ModalBody>
	)
}

export default ModalLessonsBody
