'use client'

import {
	CHECK_HOMEWORK,
	useGetLessonTasks
} from '@/entities/lesson/model/lesson.queries'
import ArrowRight from '@/shared/assets/icons/ArrowRight'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useMutation } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import FileUpload from './FileUpload'

const LessonTaskPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const t = useTranslations('LessonTask')
	const { taskData } = useGetLessonTasks(lessonId)
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)
	const [checkHomework, { loading, error, data }] = useMutation(CHECK_HOMEWORK)

	const [fileUploads, setFileUploads] = useState<{
		[key: number]: File | null
	}>({})

	const handleFileUpload = (index: number) => (acceptedFiles: File[]) => {
		setFileUploads(prev => ({
			...prev,
			[index]: acceptedFiles[0] || null
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
		} catch (err) {
			console.error('Error checking homework:', err)
		}
	}

	return (
		<DashboardLayout>
			<div className='flex flex-col items-center justify-center'>
				<div className='flex mb-4 gap-3'>
					{taskData?.lessonTasks.map((task, index) => (
						<div
							key={index}
							className={`w-[85px] h-[6px] rounded-full bg-decor-2 flex-shrink-0 cursor-pointer ${
								index === selectedTaskIndex ? 'opacity-100' : 'opacity-50'
							}`}
							onClick={() => setSelectedTaskIndex(index)}
						/>
					))}
				</div>
				<div className='w-full flex bg-decor-4 rounded-[20px] gap-10 p-5'>
					{/* Left Column: File Upload */}
					<div className='w-1/2 p-4 bg-white rounded-[10px]'>
						<h1 className='text-2xl font-bold mb-4 text-center'>
							{t('Homework')}
						</h1>

						{/* Display Current Task */}
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
									<FileUpload
										taskIndex={index}
										onDropCallback={handleFileUpload(index)}
										file={fileUploads[index]}
									/>
								</div>
							) : null
						)}

						{/* Navigation Buttons */}
					</div>

					{/* Right Column: AI Response */}
					<div className='w-1/2 p-4 bg-white rounded-[10px]'>
						<h1 className='text-2xl font-bold mb-4'>{t('AI Response')}</h1>
						<div className='flex flex-col items-center'>
							{data && (
								<div className='p-4  rounded-lg w-full'>
									<h2 className='text-lg font-semibold mb-2'>
										{t('Response')}
									</h2>
									<p className='text-lg font-medium mb-2'>
										<strong>{t('Status')}: </strong>
										{data.checkHomework.status}
									</p>
									<p className='text-lg font-medium mb-2'>
										<strong>{t('Reason')}: </strong>
										{data.checkHomework.reason}
									</p>
									<p className='text-lg font-medium mb-2'>
										<strong>{t('Incorrect Parts')}: </strong>
										{data.checkHomework.incorrectParts}
									</p>
									<div className='mt-4'>
										<Button
											onClick={() => window.open('/file-upload', '_blank')}
											color='gray'
											className='w-[180px] h-[60px]'
										>
											{t('Upload New File')}
										</Button>
									</div>
								</div>
							)}
							{error && (
								<p className='text-red-500'>
									{t('Error')}: {error.message}
								</p>
							)}
						</div>
					</div>
				</div>
				<div className='flex justify-center mt-4 flex-col'>
					<Button
						onClick={handleCheckHomework}
						disabled={!fileUploads[selectedTaskIndex] || loading}
						color='gray'
						className='w-[180px] h-[60px] rounded-[20px] mb-6'
					>
						{loading ? 'Checking...' : t('Check')}
					</Button>
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
			<Toaster position='top-right' reverseOrder={false} />
		</DashboardLayout>
	)
}

export default LessonTaskPage
