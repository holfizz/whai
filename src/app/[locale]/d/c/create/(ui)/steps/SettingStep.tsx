'use client'
import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'
import { useUpdateCourse } from '@/entities/course'
import DropImage from '@/shared/assets/icons/Course/fill/DropImage'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const SettingStep = (): React.JSX.Element => {
	const t = useTranslations('CreateCourse')
	const {
		prevStep,
		nextStep,
		videosFromYouTube,
		generateImages,
		needHomework,
		setVideosFromYouTube,
		setGenerateImages,
		setNeedHomework,
		courseId,
		selectedDescription,
		selectedTitle
	} = useCourseStore()

	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => {
			if (acceptedFiles.length > 0) {
				setSelectedFile(acceptedFiles[0])
			}
		},
		accept: { 'image/*': [] }
	})

	const { updateCourse, errorUpdatingCourse, loadingUpdatingCourse } =
		useUpdateCourse()

	const handleSaveSettings = async () => {
		try {
			if (courseId && selectedTitle) {
				const formData = new FormData()
				formData.append('file', selectedFile as File)

				await updateCourse({
					variables: {
						id: courseId,
						updateCourseData: {
							description: selectedDescription,
							name: selectedTitle
						},
						image: selectedFile
					}
				})
			} else {
				console.log('courseId', courseId)
			}
			nextStep()
		} catch (error) {
			console.error('Error updating course:', errorUpdatingCourse)
		}
	}

	useEffect(() => {
		if (selectedFile) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(selectedFile)
		} else {
			setImagePreview(null)
		}
	}, [selectedFile])

	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(80vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1 className='text-2xl'>{t('Course Settings')}</h1>

				<div className='flex gap-5 h-[200px]'>
					<div>
						<div className='mt-4 flex gap-4 justify-end items-center'>
							<label className='block mb-2'>
								{t('Need video tutorials from YouTube?')}
							</label>
							<div className='flex gap-4'>
								<Button
									size={'lg'}
									color={videosFromYouTube ? 'secondary' : 'gray'}
									onClick={() => setVideosFromYouTube(true)}
								>
									{t('Yes')}
								</Button>
								<Button
									size={'lg'}
									color={!videosFromYouTube ? 'secondary' : 'gray'}
									onClick={() => setVideosFromYouTube(false)}
								>
									{t('No')}
								</Button>
							</div>
						</div>
						<div className='mt-4 flex gap-4 justify-end items-center'>
							<label className='block mb-2'>{t('Generate pictures?')}</label>
							<div className='flex gap-4'>
								<Button
									size={'lg'}
									color={generateImages ? 'secondary' : 'gray'}
									onClick={() => setGenerateImages(true)}
								>
									{t('Yes')}
								</Button>
								<Button
									size={'lg'}
									color={!generateImages ? 'secondary' : 'gray'}
									onClick={() => setGenerateImages(false)}
								>
									{t('No')}
								</Button>
							</div>
						</div>
						<div className='mt-4 flex gap-4 justify-end items-center'>
							<label className='block mb-2'>{t('Need homework?')}</label>
							<div className='flex gap-4'>
								<Button
									size={'lg'}
									color={needHomework ? 'secondary' : 'gray'}
									onClick={() => setNeedHomework(true)}
								>
									{t('Yes')}
								</Button>
								<Button
									size={'lg'}
									color={!needHomework ? 'secondary' : 'gray'}
									onClick={() => setNeedHomework(false)}
								>
									{t('No')}
								</Button>
							</div>
						</div>
					</div>
					<div
						{...getRootProps({ className: 'dropzone' })}
						className='p-4 bg-decor-4 flex justify-center items-center cursor-pointer rounded-3xl h-full w-[200px] flex-col '
					>
						<input {...getInputProps()} />
						{imagePreview ? (
							<img
								src={imagePreview}
								alt='Preview'
								className='w-full h-full object-cover rounded-3xl'
							/>
						) : (
							<>
								<DropImage />
								<p className='text-gray-500 text-center text-sm mt-4'>
									{t('Add or drag a preview image')}
								</p>
							</>
						)}
					</div>
				</div>
				<div className='flex gap-4 mt-4'>
					<Button size={'3xl'} color={'gray'} onClick={prevStep}>
						{t('Back')}
					</Button>
					<Button
						size={'3xl'}
						color={'main'}
						onClick={handleSaveSettings}
						disabled={loadingUpdatingCourse}
					>
						{loadingUpdatingCourse ? t('Saving...') : t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default SettingStep