'use client'
import {
	CHECK_HOMEWORK,
	GET_INTERACTION_HISTORY,
	useGetLessonTasks
} from '@/entities/lesson/model/lesson.queries'
import { Link } from '@/navigation'
import ArrowRight from '@/shared/assets/icons/ArrowRight'
import BackArrow2 from '@/shared/assets/icons/BackArrow2'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useMutation, useQuery } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import FileUpload from './FileUpload'

export interface TaskResponseInterface {
	status: string
	reason: string
	incorrectParts: string
	suggestions: string
	completionPercentage: number
	links: string[]
	fileName?: string
}

const LessonTaskPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const t = useTranslations('LessonTask')
	const { taskData } = useGetLessonTasks(lessonId)
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)
	const [checkHomework, { loading, error, data }] = useMutation<{
		checkHomework: TaskResponseInterface
	}>(CHECK_HOMEWORK)

	// Храним загруженные файлы в состоянии
	const [fileUploads, setFileUploads] = useState<{
		[key: number]: File | null
	}>({})

	// Храним статус успешности для каждой задачи
	const [isTaskSuccess, setIsTaskSuccess] = useState<{
		[key: number]: boolean
	}>({})

	// Храним историю взаимодействий
	const [historyData, setHistoryData] = useState<TaskResponseInterface[]>([])

	// Реф для input элемента для загрузки файлов
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	// Получаем историю взаимодействий
	const { data: initialHistoryData } = useQuery<{
		getInteractionHistory: TaskResponseInterface[]
	}>(GET_INTERACTION_HISTORY, {
		variables: { lessonTaskId: taskData?.lessonTasks[selectedTaskIndex]?.id },
		skip: !taskData?.lessonTasks[selectedTaskIndex]?.id
	})

	useEffect(() => {
		if (initialHistoryData) {
			setHistoryData(initialHistoryData.getInteractionHistory)
		}
	}, [initialHistoryData])

	// Проверяем, есть ли хотя бы один статус COMPLETED
	const isCompleted = historyData.some(
		interaction => interaction.status === 'COMPLETED'
	)

	// Обновляем статус успешности задачи, если пришел успешный результат
	useEffect(() => {
		if (isCompleted) {
			setIsTaskSuccess(prev => ({
				...prev,
				[selectedTaskIndex]: true
			}))
		}
	}, [isCompleted, selectedTaskIndex])

	const handleFileUpload = (index: number) => (acceptedFiles: File[]) => {
		setFileUploads(prev => ({
			...prev,
			[index]: acceptedFiles[0] || null
		}))
	}
	const handleNewFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null
		setFileUploads(prev => ({
			...prev,
			[selectedTaskIndex]: file
		}))
	}

	const handleCheckHomework = async () => {
		const selectedFile = fileUploads[selectedTaskIndex]

		if (!selectedFile || !taskData?.lessonTasks[selectedTaskIndex]?.id) return

		try {
			const response = await checkHomework({
				variables: {
					checkHomeworkDto: {
						lessonTaskId: taskData.lessonTasks[selectedTaskIndex].id
					},
					file: selectedFile
				}
			})

			console.log('Homework check result:', response.data.checkHomework)

			// Обновляем историю взаимодействий с новыми данными
			const newInteraction = response.data.checkHomework
			setHistoryData(prev => [newInteraction, ...prev])

			// Если получен успешный статус, обновляем состояние успешности
			const taskSuccess = newInteraction.status === 'COMPLETED'
			if (taskSuccess) {
				setIsTaskSuccess(prev => ({
					...prev,
					[selectedTaskIndex]: true
				}))
			}
		} catch (err) {
			console.error('Error checking homework:', err)
		}
	}

	return (
		<DashboardLayout>
			<Button
				isIconOnly
				className='w-[59px] h-[59px] rounded-full mt-2 mb-10'
				startContent={<BackArrow2 />}
				color='gray'
				as={Link}
				href={getCourseByIdRoute(taskData?.courseId)}
			></Button>
			<div className='flex flex-col items-center justify-center'>
				<div className='flex mb-4 gap-3'>
					{taskData?.lessonTasks.map((task, index) => {
						const isCompleted = task.isChecked
						const isSelected = index === selectedTaskIndex

						console.log(
							`Task index: ${index}, Is Completed: ${isCompleted}, Is Selected: ${isSelected}`
						)

						const backgroundColorClass = isCompleted
							? 'bg-success-10'
							: 'bg-decor-2'
						const opacityClass = isSelected ? 'opacity-100' : 'opacity-50'

						return (
							<>
								<div
									key={index}
									className={`w-[85px] max-md:hidden h-[6px] rounded-full flex-shrink-0 cursor-pointer ${backgroundColorClass} ${opacityClass}`}
									onClick={() => setSelectedTaskIndex(index)}
								/>
							</>
						)
					})}
					<div className='md:hidden mb-4 flex w-full items-center justify-start'>
						<div className='items-start justify-start text-lg font-semibold mt-8 gap-2 w-[80vw] '>
							<span className='text-decor-2 text-7xl font-bold'>
								{taskData?.lessonTasks.reduce((count, task) => {
									return task.isChecked ? count + 1 : count
								}, 0)}
							</span>
							<span className='text-gray-3 text-3xl'>/</span>
							<span className='text-gray-3 text-3xl'>
								{taskData?.lessonTasks.length}
							</span>
						</div>
					</div>
				</div>
				<div className='w-full flex bg-decor-4 rounded-[20px] gap-10 p-5 max-md:flex-col'>
					{/* Левый столбец: Загрузка файлов */}
					<div className='w-1/2 p-4 bg-white rounded-[10px] max-md:w-full'>
						<h1 className='text-2xl font-bold mb-4 text-center'>
							{t('homework')}
						</h1>

						{/* Отображение текущей задачи */}
						{taskData?.lessonTasks.map((task, index) =>
							index === selectedTaskIndex ? (
								<div key={index} className='mb-8 flex flex-col items-center'>
									<div className='text-center mb-4'>
										<h2 className='text-lg font-semibold text-left'>
											{t('Task')} {index + 1}: {task.name}
										</h2>
										<p className='text-lg font-medium text-left mt-2 my-4'>
											{task.description}
										</p>
									</div>
									{/* Скрываем FileUpload, если задача завершена */}
									<FileUpload
										taskIndex={index}
										onDropCallback={handleFileUpload(index)}
										file={fileUploads[index]}
										fileNames={historyData.map(history => history.fileName)}
									/>
								</div>
							) : null
						)}

						{/* Навигационные кнопки */}
					</div>

					{/* Правый столбец: Ответ ИИ */}
					<div className='w-1/2 p-4 bg-white rounded-[10px] max-md:w-full'>
						<h1 className='text-2xl font-bold mb-4 text-center'>
							{t('Feedback')}
						</h1>
						{!data && (
							<p className='text-center text-secondary text-sm'>
								{t('Here you can view the results of your homework check')}
							</p>
						)}
						{loading && (
							<div className='w-full flex items-center justify-center gap-5 flex-col mt-8'>
								<BigDotsLoader />
								<p className='text-center text-secondary text-sm'>
									{t(
										'Please wait your homework is being checked It will take about 2 minutes'
									)}
								</p>
							</div>
						)}

						{/* Отображение истории взаимодействий */}
						<div className='mt-6 w-full'>
							{historyData.map((interaction, index) => (
								<div
									key={index}
									className={`p-4 mb-4 ${
										interaction.status === 'COMPLETED'
											? 'bg-success-1'
											: 'bg-error-1'
									} rounded-xl`}
								>
									{interaction.reason && (
										<p>
											<strong>{t('Reason')}: </strong>
											{interaction.reason}
										</p>
									)}
									{interaction.incorrectParts && (
										<p>
											<strong>{t('Incorrect Parts')}: </strong>
											{interaction.incorrectParts}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Кнопка для загрузки нового файла и проверки домашнего задания */}
				<div className='flex justify-center mt-4 flex-col'>
					{!isCompleted && (
						<div className='flex flex-col items-center'>
							{fileUploads[selectedTaskIndex] && historyData.length > 0 && (
								<Button
									onClick={() => fileInputRef.current?.click()}
									color='main'
									className='w-[180px] h-[60px] rounded-[20px] mb-6'
								>
									{t('Upload New File')}
								</Button>
							)}

							<input
								type='file'
								ref={fileInputRef}
								style={{ display: 'none' }}
								onChange={handleNewFileUpload}
							/>
							<Button
								onClick={handleCheckHomework}
								disabled={!fileUploads[selectedTaskIndex] || loading}
								color='gray'
								className='w-[180px] h-[60px] rounded-[20px] mb-6'
							>
								{loading ? 'Checking...' : t('Check')}
							</Button>
						</div>
					)}
					<div className='flex gap-2 justify-between items-center'>
						<Button
							disabled={selectedTaskIndex === 0}
							onClick={() => setSelectedTaskIndex(prev => prev - 1)}
							color='gray'
							isIconOnly
							className={`h-[60px] w-[80px] rounded-[20px] ${
								selectedTaskIndex === 0 && 'opacity-80'
							}`}
							startContent={<ArrowRight className='rotate-180' />}
						/>
						<Button
							disabled={selectedTaskIndex === taskData?.lessonTasks.length - 1}
							onClick={() => setSelectedTaskIndex(prev => prev + 1)}
							color='gray'
							isIconOnly
							className={`h-[60px] w-[80px] rounded-[20px] ${
								selectedTaskIndex === taskData?.lessonTasks.length - 1 &&
								'opacity-80'
							}`}
							startContent={<ArrowRight />}
						/>
					</div>
				</div>
			</div>
			<Toaster position='top-center' />
		</DashboardLayout>
	)
}

export default LessonTaskPage
