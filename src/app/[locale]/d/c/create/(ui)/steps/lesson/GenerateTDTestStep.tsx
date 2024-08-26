import { useGenerateTD } from '@/entities/titleDescription'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import logger from '@/shared/lib/utils/logger'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'
import ResetButton from '../../resetButton'
import DataCards from '../course/GenerateTDStep/DataCards'
import Loader from '../course/GenerateTDStep/Loader'

const GenerateTDLessonStep = () => {
	const t = useTranslations('CreateLesson')
	const {
		promptContent,
		step,
		prevStep,
		nextStep,
		selectedTitle,
		selectedDescription,
		setSelectedTitle,
		setSelectedDescription
	} = useUnifiedStore()

	const { mutationTD, mutationTDData, errorTD, loadingTD } = useGenerateTD()

	const [titleDescriptionData, setTitleDescriptionData] = useState([])
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	)
	const [requestSuccessful, setRequestSuccessful] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const hasFetched = useRef(false)

	const handleGenerateTD = useCallback(async () => {
		logger.log('handleGenerateTD called')
		if (!requestSuccessful) {
			try {
				if (!selectedTitle && !isLoading && !loadingTD) {
					logger.log('Starting request')
					setIsLoading(true)
					await mutationTD({
						variables: {
							dto: {
								userRequest: promptContent,
								type: 'LESSON'
							}
						}
					})
					setRequestSuccessful(true)
				}
			} catch (error) {
				logger.error('Error generating title and description: ', error)
			} finally {
				setIsLoading(false)
			}
		}
	}, [
		requestSuccessful,
		selectedTitle,
		promptContent,
		isLoading,
		loadingTD,
		mutationTD
	])

	useEffect(() => {
		logger.log('mutationTDData changed', mutationTDData)
		if (mutationTDData.length > 0) {
			setTitleDescriptionData(mutationTDData)
		}
	}, [mutationTDData])

	useEffect(() => {
		if (!hasFetched.current) {
			logger.log('useEffect running')
			handleGenerateTD()
			hasFetched.current = true
		}
	}, [handleGenerateTD])

	const reGenerateTD = () => {
		logger.log('Re-generating TD')
		setRequestSuccessful(false)
		setIsLoading(true)
		handleGenerateTD()
	}

	const handleSaveEdit = (updatedData, index) => {
		logger.log('Saving edit', { updatedData, index })
		const updatedTDData = titleDescriptionData.map((td, i) =>
			i === index ? { ...td, ...updatedData } : td
		)
		setTitleDescriptionData(updatedTDData)
	}

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorTD) {
		return (
			<DashboardLayout>
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4 '>
						{t('What will the lesson be about')}
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
							onClick={prevStep}
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
		if (selectedCardIndex !== null) {
			const selectedTD = titleDescriptionData[selectedCardIndex]
			setSelectedTitle(selectedTD.title)
			setSelectedDescription(selectedTD.description)
			nextStep()
		} else if (selectedTitle) {
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
				<h1 className='text-2xl'>{t('What will the lesson be about')}</h1>
				{selectedTitle ? (
					<div className='flex flex-col w-1/3'>
						<h1 className='text-lg font-medium my-5'>
							{t('Here is the title and description you chose')}
						</h1>
						<div className='w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer bg-decor-3'>
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
						isIconOnly
						onClick={reGenerateTD}
					>
						<RegenerateIcon />
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

export default GenerateTDLessonStep
