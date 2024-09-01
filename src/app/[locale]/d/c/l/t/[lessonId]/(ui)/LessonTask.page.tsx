'use client'

import { useGetLessonTasks } from '@/entities/lesson/model/lesson.queries'
import FileIcon from '@/shared/assets/icons/File'
import UploadIcon from '@/shared/assets/icons/Upload'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone' // Make sure to import useDropzone

const LessonTaskPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()
	const t = useTranslations('LessonTask')
	const { taskData } = useGetLessonTasks(lessonId)
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)
	const [selectedFiles, setSelectedFiles] = useState<
		Record<number, File | null>
	>({})
	const [imagePreviews, setImagePreviews] = useState<
		Record<number, string | null>
	>({})

	const handleDrop = (acceptedFiles: File[], taskId: number) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0]
			setSelectedFiles(prevState => ({ ...prevState, [taskId]: file }))

			const fileType = file.type.split('/')[0]
			if (fileType === 'image') {
				const reader = new FileReader()
				reader.onloadend = () => {
					setImagePreviews(prevState => ({
						...prevState,
						[taskId]: reader.result as string
					}))
				}
				reader.readAsDataURL(file)
			} else {
				setImagePreviews(prevState => ({ ...prevState, [taskId]: null }))
			}
		}
	}

	// Initialize the useDropzone hook
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => handleDrop(acceptedFiles, selectedTaskIndex),
		accept: {
			'application/msword': ['.doc', '.docx'],
			'application/vnd.ms-excel': ['.xls', '.xlsx'],
			'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
			'application/pdf': ['.pdf'],
			'application/vnd.apple.numbers': ['.numbers'],
			'text/csv': ['.csv'],
			'image/jpeg': ['.jpg', '.jpeg'],
			'image/jp2': ['.jp2'],
			'image/png': ['.png'],
			'image/gif': ['.gif'],
			'image/webp': ['.webp'],
			'image/heic': ['.heic'],
			'image/heif': ['.heif'],
			'image/bmp': ['.bmp'],
			'image/x-photo-cd': ['.pcd'],
			'image/tiff': ['.tiff', '.tif']
		}
	})

	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center'>
				<h1 className='text-2xl font-bold mb-4'>Домашнее задание</h1>

				{/* Task Navigation */}
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

				{/* Display Current Task */}
				{taskData?.lessonTasks.map(
					(task, index) =>
						index === selectedTaskIndex && (
							<div key={index} className='mb-8 w-full max-w-md'>
								<h2 className='text-lg font-semibold mb-2'>
									{t(`Task`)} {index + 1}: {task.name}
								</h2>
								<p>{task.description}</p>
								<div
									{...getRootProps({ className: 'dropzone' })}
									className='px-16 py-6 border-4 border-dashed border-decor-2 rounded-lg w-full flex flex-col items-center justify-center cursor-pointer bg-decor-4'
								>
									<input {...getInputProps()} />
									{selectedFiles[index] ? (
										imagePreviews[index] ? (
											<img
												src={imagePreviews[index] as string}
												alt='Preview'
												className='w-full h-full object-cover rounded-lg'
											/>
										) : (
											<div className='flex flex-col items-center'>
												<FileIcon />
												<p className='text-center text-sm mt-2'>
													{selectedFiles[index]?.name}
												</p>
											</div>
										)
									) : (
										<div className='text-center flex flex-col items-center justify-center gap-5'>
											<div className='bg-decor-4'>
												<UploadIcon />
											</div>
											<h1 className='text-sm font-medium mt-8 my-4'>
												{t('Supported file formats for upload')}
											</h1>
											<p className='text-gray-600 text-sm w-full flex items-center'>
												{t(
													'Documents DOC DOCX XLS XLSX PPT PPTX PDF Numbers CSV'
												)}
												<br />
												{t(
													'Images JPG JPG2 PNG GIF WEB HEIC HEIF BMP PCD TIFF'
												)}
												<br />
												{t(
													'The size of all uploaded files is no more than 100 MB'
												)}
											</p>
										</div>
									)}
								</div>
							</div>
						)
				)}

				{/* Navigation Buttons */}
				<div className='flex justify-between w-full max-w-md mt-4'>
					<Button
						disabled={selectedTaskIndex === 0}
						onClick={() => setSelectedTaskIndex(prev => prev - 1)}
					>
						{t('Previous')}
					</Button>
					<Button
						disabled={selectedTaskIndex === taskData?.lessonTasks.length - 1}
						onClick={() => setSelectedTaskIndex(prev => prev + 1)}
					>
						{t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default LessonTaskPage
