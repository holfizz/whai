'use client'
import React from 'react'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import useCourseStore from '@/app/[locale]/d/c/create/(model)/create-page.store'

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

	const handleSaveSettings = () => {
		nextStep()
	}

	return (
		<DashboardLayout>
			<div className='w-full flex justify-center items-center flex-col'>
				<h1 className='text-2xl'>{t('Course Settings')}</h1>

				<div className='mt-4 flex gap-4 items-center'>
					<label className='block mb-2'>
						{t('Need video tutorials from YouTube?')}
					</label>
					<div className='flex gap-4'>
						<Button
							size={'lg'}
							color={videosFromYouTube ? 'secondary' : 'primary'}
							onClick={() => setVideosFromYouTube(true)}
						>
							{t('Yes')}
						</Button>
						<Button
							size={'lg'}
							color={!videosFromYouTube ? 'secondary' : 'primary'}
							onClick={() => setVideosFromYouTube(false)}
						>
							{t('No')}
						</Button>
					</div>
				</div>
				<div className='mt-4 flex gap-4 items-center'>
					<label className='block mb-2'>{t('Generate pictures?')}</label>
					<div className='flex gap-4'>
						<Button
							size={'lg'}
							color={generateImages ? 'secondary' : 'primary'}
							onClick={() => setGenerateImages(true)}
						>
							{t('Yes')}
						</Button>
						<Button
							size={'lg'}
							color={!generateImages ? 'secondary' : 'primary'}
							onClick={() => setGenerateImages(false)}
						>
							{t('No')}
						</Button>
					</div>
				</div>
				<div className='mt-4 flex gap-4 items-center'>
					<label className='block mb-2'>{t('Need homework?')}</label>
					<div className='flex gap-4'>
						<Button
							size={'lg'}
							color={needHomework ? 'secondary' : 'primary'}
							onClick={() => setNeedHomework(true)}
						>
							{t('Yes')}
						</Button>
						<Button
							size={'lg'}
							color={!needHomework ? 'secondary' : 'primary'}
							onClick={() => setNeedHomework(false)}
						>
							{t('No')}
						</Button>
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
