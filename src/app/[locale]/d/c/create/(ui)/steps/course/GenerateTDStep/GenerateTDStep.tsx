import { useCreateCourse } from '@/entities/course/model/course.queries'
import { useCreateCourseAIHistory } from '@/entities/courseAIHistory'
import { useGenerateTD } from '@/entities/titleDescription'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import useUnifiedStore from '../../../../(model)/unified.state'
import ResetButton from '../../../resetButton'
import DataCards from './DataCards'
import Loader from './Loader'

const GenerateTDStep = (): React.JSX.Element => {
	const t = useTranslations('CreateCourse')
	const {
		promptContent,
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
					mutationTD({
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
	}, [
		historyData,
		loadingCreatingHistory,
		errorCreatingHistory,
		requestSuccessful,
		selectedTitle,
		mutationTD,
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
		handleGenerateTD()
	}, [handleGenerateTD])

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

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorCreatingCourse || errorCreatingHistory || errorTD) {
		return (
			<DashboardLayout>
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4'>
						{t('An error occurred while generating headers')}
					</h1>
					<Button
						size={'3xl'}
						color={'main'}
						onClick={() => window.location.reload()}
					>
						{t('Try one more time')}
					</Button>
					<Button
						className='mt-3'
						size={'3xl'}
						color={'main'}
						onClick={prevStep}
					>
						{t('Back')}
					</Button>
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
			<div
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
				className='w-full flex justify-center items-center flex-col'
			>
				<h1 className='text-2xl'>{t('Which course description fits best?')}</h1>
				{selectedTitle ? (
					<div className='flex flex-col w-1/3'>
						<h1 className='text-lg font-medium my-5'>
							{t('Here is the title and description you chose')}
						</h1>
						<div
							className={`w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer bg-decor-3`}
						>
							<h1 className='text-xl font-medium'>{selectedTitle}</h1>
							<p className='text-lg mt-2'>{selectedDescription}</p>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
						{isLoading || loadingTD ? (
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
				<div className={'flex gap-4 mt-4'}>
					<Button
						isDisabled={loadingTD}
						size={'3xl'}
						color={'gray'}
						onClick={prevStep}
					>
						{t('Back')}
					</Button>
					<Button
						isDisabled={loadingTD}
						size={'3xl'}
						color={'main'}
						onClick={reGenerateTD}
					>
						{t('Re-generate')}
					</Button>
					{conditionNextButton && (
						<Button
							isDisabled={loadingTD}
							size={'3xl'}
							color={'main'}
							onClick={handleNextStep}
						>
							{t('Next')}
						</Button>
					)}
					<ResetButton isLoading={loadingTD} />
				</div>
			</div>
		</DashboardLayout>
	)
}

export default GenerateTDStep
