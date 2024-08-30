'use client'
import { coursesExample } from '@/app/[locale]/d/(model)/static-course.data'
import ArrowDown from '@/shared/assets/icons/ArrowDown'
import ClockIcon from '@/shared/assets/icons/Clock'
import ListIcon from '@/shared/assets/icons/List'
import QuizIcon from '@/shared/assets/icons/Quiz'
import ShareIcon from '@/shared/assets/icons/Share'
import EngImage from '@/shared/assets/image/EnglishCourseAvatar.png'
import { Accordion, AccordionItem } from '@/shared/ui/Accordion/MyAccordion'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
const ExampleCoursePage = () => {
	const { courseId } = useParams<{ courseId: string }>()
	const course = coursesExample.find(c => c.id === courseId)

	if (!course) {
		return <div>Курс не найден</div>
	}

	const totalQuizzes = course.topics.reduce((total, topic) => {
		return (
			total +
			topic.subtopics.reduce((subTotal, subtopic) => {
				return subTotal + subtopic.quizzes.length
			}, 0)
		)
	}, 0)

	const handleShare = async () => {
		const url = window.location.href
		try {
			await navigator.clipboard.writeText(url)
			alert('Ссылка скопирована в буфер обмена!')
		} catch (error) {
			console.error('Ошибка при копировании в буфер обмена:', error)
		}
	}

	return (
		<DashboardLayout>
			<div>
				<h1 className='text-secondary text-[16px] font-medium'>Курс</h1>
				<h1 className='text-accent text-lg font-bold'>{course.name}</h1>
				<div className='flex w-full items-center my-4 mr-3'>
					<div className='w-2/3 pr-6'>
						<p className='text-base text-secondary'>
							{course.description.split('\n').map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</p>
						<div className='flex justify-between items-center mt-4'>
							<div className='flex gap-6 w-full'>
								<li className='flex w-fit items-center gap-2'>
									<ClockIcon />{' '}
									<span className='text-secondary flex items-center w-max'>
										{course.completionTime} часа
									</span>
								</li>
								<li className='flex w-fit items-center gap-2'>
									<ListIcon className='text-secondary' fontSize={18} />{' '}
									<span className='text-secondary flex items-center w-max'>
										{course.topics.length} тем
									</span>
								</li>
								<li className='flex w-fit items-center gap-2'>
									<QuizIcon className='text-secondary' fontSize={18} />
									<span className='text-secondary flex items-center w-max'>
										{totalQuizzes} тестов
									</span>
								</li>
							</div>
							<div>
								<Button
									onPress={handleShare}
									color={'gray-text'}
									startContent={<ShareIcon />}
								>
									Поделиться
								</Button>
							</div>
						</div>
						<div className='w-full h-[1px] bg-secondary mt-4 rounded-sm'></div>
					</div>
					<div className='w-1/3'>
						<Image
							width={270}
							src={course.image === 'English' ? EngImage : ''}
							alt={course.image === 'English' ? 'boy' : ''}
						/>
						<div className='rounded-3xl bg-decor-4 p-5 flex flex-col gap-3 w-[270px]'>
							<div className='flex gap-2 w-full items-center'>
								<h2 className='text-secondary text-sm'>Дата обновления:</h2>
								<p className='text-sm text-accent'>{course.updatedAt}</p>
							</div>
							<div className='flex gap-2 w-full items-center'>
								<h2 className='text-secondary text-sm'>Теги:</h2>
								<div className='flex gap-1 text-sm'>
									{course.tags.map(item => (
										<div
											key={item}
											className='bg-bg-accent text-accent w-fit px-2 py-1 rounded-xl'
										>
											{item}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='w-2/3 select-none'>
					{course.topics.map((topic, index) => {
						const [isOpen, setIsOpen] = React.useState(false)

						return (
							<div key={index} className='mt-5'>
								<h1 className='text-secondary text-[16px] font-medium'>
									Модуль {index + 1}
								</h1>
								<div className='w-full flex justify-between'>
									<h2 className='text-lg font-medium'>{topic.name}</h2>
									<div
										className='w-[32px] h-[32px] rounded-md bg-decor-3 flex items-center justify-center cursor-pointer'
										onClick={() => setIsOpen(!isOpen)}
									>
										<ArrowDown
											style={{
												transform: `rotate(${isOpen ? '180deg' : '0deg'})`
											}}
										/>
									</div>
								</div>
								<p className='text-base text-accent mt-4'>
									{topic.description}
								</p>
								{isOpen && (
									<Accordion className='pt-6'>
										{topic.subtopics.map((subtopic, subIndex) => (
											<AccordionItem
												classNameHeaderContent={'header-content-decor-1'}
												key={subIndex}
												title={
													<div className='flex gap-4'>
														<h2 className='text-yellow-5 text-sm'>Тема</h2>
														<p className='flex gap-2'>
															{`${index + 1}.${subIndex + 1}`} {subtopic.name}
														</p>
													</div>
												}
											>
												{/* <h2 className='text-lg font-semibold'>
													{subtopic.name}
												</h2> */}
												<p className='w-full'>{subtopic.description}</p>
												{subtopic.lessons.map((lesson, lessonIndex) => (
													<div key={lessonIndex} className='mt-2'>
														<h3>{lesson.name}</h3>
														<p>{lesson.description}</p>
													</div>
												))}
												{subtopic.quizzes.map((quiz, quizIndex) => (
													<div key={quizIndex} className='mt-2'>
														<h4>{quiz.name}</h4>
														<p>{quiz.description}</p>
													</div>
												))}
											</AccordionItem>
										))}
									</Accordion>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</DashboardLayout>
	)
}

export default ExampleCoursePage
