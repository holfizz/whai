'use client'
import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'
import DropImage from '@/shared/assets/icons/Course/fill/DropImage'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React from 'react'
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
		setNeedHomework
	} = useCourseStore(state => ({
		prevStep: state.prevStep,
		nextStep: state.nextStep,
		videosFromYouTube: state.videosFromYouTube,
		generateImages: state.generateImages,
		needHomework: state.needHomework,
		setVideosFromYouTube: state.setVideosFromYouTube,
		setGenerateImages: state.setGenerateImages,
		setNeedHomework: state.setNeedHomework
	}))

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => {
			console.log(acceptedFiles)
			// Handle file upload here
		},
		accept: 'image/*' // Adjust the file types as needed
	})

	const handleSaveSettings = () => {
		nextStep()
	}

	return (
		<DashboardLayout>
			<div className='w-full flex justify-center items-center flex-col'>
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
						<DropImage />
						<p className='text-gray-500 text-center text-sm mt-4'>
							{t('Add or drag a preview image')}
						</p>
					</div>
				</div>
				<div className='flex gap-4 mt-4'>
					<Button size={'3xl'} color={'gray'} onClick={prevStep}>
						{t('Back')}
					</Button>
					<Button size={'3xl'} color={'main'} onClick={handleSaveSettings}>
						{t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default SettingStep
