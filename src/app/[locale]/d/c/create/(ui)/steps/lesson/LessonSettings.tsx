'use client'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React from 'react'
import useUnifiedStore from '../../../(model)/unified.state'

const LessonSettings = (): React.JSX.Element => {
	const t = useTranslations('CreateLesson')
	const {
		prevStep,
		nextStep,
		videosFromYouTube,
		generateImages,
		needHomework,
		setVideosFromYouTube,
		setGenerateImages,
		setNeedHomework
	} = useUnifiedStore()

	return (
		<DashboardLayout>
			<div className='w-full flex justify-center items-center flex-col h-auto'>
				<h1 className='text-2xl'>{t('Lesson Settings')}</h1>

				<div className='flex gap-5 max-640:flex-col-reverse max-640:flex-wrap h-auto max-640:justify-center max-640:items-center max-640:mt-40'>
					<div className='h-auto flex flex-col justify-center max-640:h-auto'>
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
						{/* <div className='mt-4 flex gap-4 justify-end items-center'>
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
						</div> */}
					</div>
				</div>
				<div className='flex gap-4 mt-4 max-640:flex-col max-640:items-center max-640:mt-28'>
					<Button
						className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
						size={'3xl'}
						color={'gray'}
						onClick={prevStep}
					>
						{t('Back')}
					</Button>

					<Button
						className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
						size={'3xl'}
						color={'main'}
						onClick={nextStep}
					>
						{t('Next')}
					</Button>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default LessonSettings
