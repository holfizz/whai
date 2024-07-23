'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useCourseStore from '../../(model)/createPage.state'
import { useCreateCourseAIHistory } from '@/entities/courseAIHistory'
import { useCreateCourse } from '@/entities/course/model/course.queries'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'

const GenerateTDStep = (): React.JSX.Element => {
	const forTest = [
		{
			title: 'Английский для уровня B1: Основы',
			description:
				'Освойте базовые навыки общения на английском языке! Курс фокусируется на грамматике уровня B1, расширении словарного запаса, развитии навыков аудирования и говорения в повседневных ситуациях.'
		},
		{
			title: 'Разговорный английский B1',
			description:
				'Чувствуйте себя уверенно в беседах на английском! Курс направлен на развитие беглой речи, преодоление языкового барьера, изучение разговорных фраз и идиом. Подходит для тех, кто хочет свободно общаться на повседневные темы.'
		},
		{
			title: 'Грамматика английского B1: Шаг за шагом',
			description:
				'Углубите свои знания грамматики для успешной сдачи экзаменов и беглого общения!  Курс охватывает времена глаголов, модальные глаголы, пассивный залог и другие важные грамматические темы уровня B1.'
		},
		{
			title: 'Английский B1 для путешествий',
			description:
				'Путешествуйте с уверенностью!  Курс обучает практическому английскому для путешествий: бронирование жилья, заказ еды, общение в аэропорту,  ориентирование в городе.  '
		}
	]
	const t = useTranslations('CreateCourse')
	const {
		promptContent,
		step,
		prevStep,
		nextStep,
		setSelectedTitle,
		setSelectedDescription
	} = useCourseStore(state => ({
		promptContent: state.promptContent,
		step: state.step,
		prevStep: state.prevStep,
		nextStep: state.nextStep,
		setSelectedTitle: state.setSelectedTitle,
		setSelectedDescription: state.setSelectedDescription
	}))

	const {
		createCourse,
		newCourseData,
		errorCreatingCourse,
		loadingCreatingCourse
	} = useCreateCourse()
	const {
		createCourseAIHistory,
		historyData,
		errorCreatingHistory,
		loadingCreatingHistory
	} = useCreateCourseAIHistory()
	//TODO: ETO DLYA TESTA
	// const { mutationTD, mutationTDData, errorTD, loadingTD } = useGenerateTD()
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	)
	const [requestSuccessful, setRequestSuccessful] = useState(false)

	const handleCreateCourse = useCallback(async () => {
		try {
			await createCourse()
		} catch (error) {
			console.error('Error creating course: ', error)
		}
	}, [createCourse])

	const handleCreateCourseAIHistory = useCallback(async () => {
		if (newCourseData?.id && !loadingCreatingCourse && !errorCreatingCourse) {
			try {
				await createCourseAIHistory({
					variables: { courseId: newCourseData.id }
				})
			} catch (error) {
				console.error('Error creating course AI history: ', error)
			}
		}
	}, [
		createCourseAIHistory,
		newCourseData,
		loadingCreatingCourse,
		errorCreatingCourse
	])

	const handleGenerateTD = useCallback(async () => {
		if (historyData?.id && !loadingCreatingHistory && !errorCreatingHistory) {
			try {
				// await mutationTD({
				// 	variables: {
				// 		dto: { userRequest: promptContent, conversationId: historyData.id }
				// 	}
				// })
				setRequestSuccessful(true)
			} catch (error) {
				console.error('Error generating title and description: ', error)
			}
		}
	}, [
		'mutationTD',
		historyData,
		loadingCreatingHistory,
		errorCreatingHistory,
		promptContent
	])

	useEffect(() => {
		handleCreateCourse()
	}, [handleCreateCourse])

	useEffect(() => {
		handleCreateCourseAIHistory()
	}, [newCourseData, handleCreateCourseAIHistory])

	useEffect(() => {
		handleGenerateTD()
	}, [historyData, handleGenerateTD])

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorCreatingCourse || errorCreatingHistory || !'errorTD') {
		return (
			<DashboardLayout>
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4'>
						{errorCreatingCourse?.message ||
							errorCreatingHistory?.message ||
							!'errorTD?.message ' ||
							'An unknown error occurred'}
					</h1>
					<Button
						size={'3xl'}
						color={'main'}
						onClick={() => window.location.reload()}
					>
						Reload Page
					</Button>
				</div>
			</DashboardLayout>
		)
	}

	const Loader = () => (
		<>
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className={`w-full h-auto min-h-30 py-2 px-7 rounded-2xl bg-decor-3 flex flex-col justify-center items-center p-4`}
				>
					<h1 className={'text-sm text-[#97917D] text-center'}>
						{t('Generating, wait a couple of seconds')}
					</h1>
					<DotsLoader className={'mt-4'} />
				</div>
			))}
		</>
	)

	const DataCards = () => (
		<>
			{forTest.map((td, index) => (
				<div
					key={index}
					onClick={() => setSelectedCardIndex(index)}
					className={`w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer ${selectedCardIndex === index ? 'bg-decor-2' : 'bg-decor-3'}`}
				>
					<h1 className='text-xl font-medium'>{td.title}</h1>
					<p className='text-lg mt-2'>{td.description}</p>
				</div>
			))}
		</>
	)

	const handleNextStep = () => {
		if (selectedCardIndex !== null) {
			const selectedTD = forTest[selectedCardIndex]
			setSelectedTitle(selectedTD.title)
			setSelectedDescription(selectedTD.description)
			nextStep()
		}
	}

	return (
		<DashboardLayout>
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1 className='text-2xl'>{t('Which course description fits best?')}</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
					{false && !requestSuccessful ? <Loader /> : <DataCards />}
				</div>
				<div className={'flex gap-4 mt-4'}>
					<Button size={'3xl'} color={'gray'} onClick={prevStep}>
						{t('Back')}
					</Button>
					{selectedCardIndex !== null && (
						<Button size={'3xl'} color={'main'} onClick={handleNextStep}>
							{t('Next')}
						</Button>
					)}
				</div>
			</div>
		</DashboardLayout>
	)
}

export default GenerateTDStep
