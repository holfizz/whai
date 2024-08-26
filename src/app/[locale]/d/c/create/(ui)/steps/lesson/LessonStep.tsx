import { useCreateIndependentLessonWithAI } from '@/entities/lesson'
import { useRouter } from '@/navigation'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import { getLessonIndependentRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useUnifiedStore from '../../../(model)/unified.state'

const LessonStep = () => {
	const t = useTranslations('CreateLesson')
	const {
		createLesson,
		dataCreateLesson,
		errorCreateLesson,
		loadingCreateLesson
	} = useCreateIndependentLessonWithAI()
	const router = useRouter()
	const {
		setLessonId,
		lessonId,
		selectedDescription,
		selectedTitle,
		needHomework,
		generateImages,
		videosFromYouTube
	} = useUnifiedStore()
	const hasCreatedLesson = useRef(false)

	useEffect(() => {
		if (lessonId) {
			router.replace(getLessonIndependentRoute(lessonId))
		} else if (!hasCreatedLesson.current) {
			// Проверка, чтобы запрос выполнялся только один раз
			createLesson({
				variables: {
					dto: {
						lessonTitle: selectedTitle,
						lessonDescription: selectedDescription,
						isHasVideo: videosFromYouTube,
						isHasAISearchImage: generateImages
					}
				}
			})
			hasCreatedLesson.current = true // Устанавливаем флаг после выполнения запроса
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lessonId, router, createLesson, selectedTitle, selectedDescription])

	useEffect(() => {
		if (dataCreateLesson) {
			setLessonId(dataCreateLesson.id)
			router.replace(getLessonIndependentRoute(dataCreateLesson.id))
		}
	}, [dataCreateLesson, router, setLessonId])

	useEffect(() => {
		if (errorCreateLesson) {
			toast.error(t('An error occurred while creating the lesson'))
		}
	}, [errorCreateLesson, t])

	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center justify-center'>
				{loadingCreateLesson && (
					<div className='flex flex-col items-center'>
						<h1 className={'text-2xl text-bold'}>
							{t('We continue to create a lesson')}
						</h1>
						<p className={'text-sm text-secondary mx-4'}>
							{t(
								'This will take a couple of minutes. Please do not close the page'
							)}
						</p>
						<BigDotsLoader />
					</div>
				)}
				{errorCreateLesson && (
					<div className='w-full flex justify-center flex-col gap-5 items-center'>
						<h1>{t('Oops Error please try again')}</h1>
						<Button
							className=' w-[100px] h-[50px] rounded-2xl p-0'
							color={'main'}
							isIconOnly
							startContent={<RegenerateIcon />}
							onClick={() => window.location.reload()}
						/>
					</div>
				)}
				<Toaster position='top-right' reverseOrder={false} />
			</div>
		</DashboardLayout>
	)
}

export default LessonStep
