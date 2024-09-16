import { useCreateCourse } from '@/entities/course/model/course.queries'
import { useCreateCourseAIHistory } from '@/entities/courseAIHistory'
import { useGenerateTD } from '@/entities/titleDescription'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'

import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import React, { useCallback, useEffect, useState } from 'react'
import useUnifiedStore from '../../../../(model)/unified.state'
import DataCards from './DataCards'
import Loader from './Loader'

const GenerateTDStep = (): React.JSX.Element => {
	const t = useTranslations('CreateCourse')

	const {
		promptContent,
		setPromptContent,
		step,
		prevStep,
		nextStep,
		setCourseId,
		courseId,
		selectedTitle,
		selectedDescription,
		setSelectedTitle,
		setSelectedDescription
	} = useUnifiedStore()
	const { userData } = useGetProfile()

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
	const { mutationTD, mutationTDData, errorTD, loadingTD } = useGenerateTD()

	const [titleDescriptionData, setTitleDescriptionData] = useState([])
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	)
	const [requestSuccessful, setRequestSuccessful] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showPromptOptions, setShowPromptOptions] = useState(true)

	const handleCreateCourse = useCallback(async () => {
		if (!loadingCreatingCourse && !errorCreatingCourse && !newCourseData) {
			if (!courseId) {
				try {
					await createCourse({
						variables: {
							createCourseData: {},
							image: null
						}
					})
				} catch (error) {
					console.error('Error creating course: ', error)
				}
			}
		}
	}, [
		createCourse,
		errorCreatingCourse,
		loadingCreatingCourse,
		newCourseData,
		courseId
	])

	useEffect(() => {
		setCourseId(newCourseData?.id)
	}, [newCourseData, setCourseId])

	const handleCreateCourseAIHistory = useCallback(async () => {
		if (
			newCourseData?.id &&
			!loadingCreatingCourse &&
			!errorCreatingCourse &&
			!historyData?.id
		) {
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
		newCourseData?.id,
		loadingCreatingCourse,
		errorCreatingCourse,
		historyData?.id
	])

	const handleGenerateTD = useCallback(async () => {
		if (
			historyData?.id &&
			!loadingCreatingHistory &&
			!errorCreatingHistory &&
			!requestSuccessful
		) {
			try {
				if (!selectedTitle) {
					setIsLoading(true)
					await mutationTD({
						variables: {
							dto: {
								userRequest: promptContent,
								type: 'COURSE',
								conversationId: historyData.id
							}
						}
					})
					setRequestSuccessful(true)
				}
			} catch (error) {
				console.error('Error generating title and description: ', error)
			} finally {
				setIsLoading(false)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		historyData,
		loadingCreatingHistory,
		errorCreatingHistory,
		requestSuccessful,
		selectedTitle,
		promptContent
	])

	useEffect(() => {
		handleCreateCourse()
	}, [handleCreateCourse])

	useEffect(() => {
		handleCreateCourseAIHistory()
	}, [handleCreateCourseAIHistory])

	useEffect(() => {
		if (mutationTDData.length > 0) {
			setTitleDescriptionData(mutationTDData)
		}
	}, [mutationTDData])

	useEffect(() => {
		if (!showPromptOptions) {
			handleGenerateTD()
		}
	}, [handleGenerateTD, showPromptOptions])

	const reGenerateTD = () => {
		setRequestSuccessful(false)
		setIsLoading(true)
		handleGenerateTD()
	}

	const handleSaveEdit = (updatedData, index) => {
		const updatedTDData = titleDescriptionData.map((td, i) =>
			i === index ? { ...td, ...updatedData } : td
		)
		setTitleDescriptionData(updatedTDData)
	}

	const handlePromptOption = () => {
		setShowPromptOptions(false)
	}

	const handleBack = () => {
		setPromptContent(null)
		setSelectedTitle(null)
		setSelectedDescription(null)
		prevStep()
	}

	const handleNoHelp = () => {
		setSelectedTitle(promptContent)
		nextStep()
	}

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorCreatingCourse || errorCreatingHistory || errorTD) {
		return (
			<DashboardLayout>
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4 '>
						{t('What will the course be about?')}
					</h1>
					<h3 className='text-lg mb-4 text-error-text'>
						{t('Oops Error please try again')}
					</h3>
					<p className='text-lg mb-4 text-error-text px-6 py-3 bg-error-1 rounded-2xl'>
						{promptContent}
					</p>
					<div className='w-[30%] flex mt-10 items-center justify-center'>
						<Button
							className='w-auto px-10 h-[70px] rounded-3xl ml-5'
							color={'main'}
							onClick={handleBack}
						>
							{t('Back')}
						</Button>
						<Button
							className='ml-5 h-[70px] w-[70px] rounded-3xl p-0'
							color={'gray'}
							isIconOnly
							startContent={<RegenerateIcon />}
							onClick={() => window.location.reload()}
						/>
					</div>
				</div>
			</DashboardLayout>
		)
	}

	const handleNextStep = () => {
		if (selectedCardIndex !== null && courseId) {
			const selectedTD = titleDescriptionData[selectedCardIndex]
			setSelectedTitle(selectedTD.title)
			setSelectedDescription(selectedTD.description)
			nextStep()
		} else if (selectedTitle && courseId) {
			nextStep()
		}
	}

	const conditionNextButton = selectedCardIndex !== null || selectedTitle

	return (
		<DashboardLayout>
			<div className='w-full flex justify-center items-center flex-col'>
				{showPromptOptions ? (
					<div className='text-center'>
						<h1 className='text-2xl mb-4'>
							{t('Do you need help finalizing your request')}
						</h1>
						<div className='flex gap-5 items-center justify-center'>
							<Button
								title={
									userData?.additionalTitlesCount === 0
										? 'У вас недостаточно генераций заголовков'
										: null
								}
								disabled={userData?.additionalTitlesCount === 0}
								isDisabled={userData?.additionalTitlesCount === 0}
								color='main'
								size='xl'
								className='mt-4'
								onClick={handlePromptOption}
							>
								{t('Yes, help me')}
							</Button>
							<Button
								color='gray'
								size='xl'
								className='mt-4'
								onClick={handleNoHelp}
							>
								{t('No, continue')}
							</Button>
						</div>
					</div>
				) : (
					<div className='w-full flex flex-col items-center'>
						<h1 className='text-2xl text-center max-640:text-4xl my-4 font-normal'>
							{t('Which course description fits best?')}
						</h1>
						{selectedTitle ? (
							<div className='flex flex-col w-1/3'>
								<h1 className='text-lg font-medium my-5'>
									{t('Here is the title and description you chose')}
								</h1>
								<div
									className={
										'w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer bg-decor-3'
									}
								>
									<h1 className='text-xl font-medium'>{selectedTitle}</h1>
									<p className='mt-4'>{selectedDescription}</p>
								</div>
							</div>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-640:w-[90vw]'>
								{isLoading ? (
									<Loader />
								) : (
									<DataCards
										isLoading={loadingTD}
										mutationTDData={titleDescriptionData}
										setSelectedCardIndex={setSelectedCardIndex}
										selectedCardIndex={selectedCardIndex}
										onEditSave={handleSaveEdit}
									/>
								)}
							</div>
						)}
					</div>
				)}
				{!showPromptOptions && (
					<div className='flex gap-4 mt-4 max-640:flex-col max-640:items-center max-640:mt-28'>
						<Button
							className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
							size={'xl'}
							color={'gray'}
							onClick={prevStep}
						>
							{t('Back')}
						</Button>

						<Button
							className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[50vw]'
							size={'xl'}
							color={'main'}
							onClick={handleNextStep}
						>
							{t('Next')}
						</Button>
					</div>
				)}
			</div>
		</DashboardLayout>
	)
}

export default GenerateTDStep
