import { useGetProfile } from '@/entities/Auth/model/auth.queries'
import { useGenerateTD } from '@/entities/titleDescription'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import logger from '@/shared/lib/utils/logger'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'
import DataCards from '../course/GenerateTDStep/DataCards'

const GenerateTDTestStep = () => {
	const t = useTranslations('CreateTest')
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
	const [showPromptOptions, setShowPromptOptions] = useState(true)
	const { userData } = useGetProfile()

	const [titleDescriptionData, setTitleDescriptionData] = useState([])
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	)
	const [requestSuccessful, setRequestSuccessful] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

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
								type: 'TEST'
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

	const handleNoHelp = () => {
		setShowPromptOptions(false)
		setRequestSuccessful(true)
		setSelectedTitle(promptContent)
		setSelectedDescription('') // Clear description as it is not set
		nextStep()
	}

	const handlePromptOption = () => {
		setShowPromptOptions(false)
		setRequestSuccessful(false) // Allow the generation
		handleGenerateTD()
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

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorTD) {
		return (
			<DashboardLayout>
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4 '>{t('What will the quiz be about')}</h1>
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
								disabled={userData?.additionalTitlesCount === 0}
								isDisabled={userData?.additionalTitlesCount === 0}
								color='main'
								size='xl'
								className='mt-4'
								onClick={handlePromptOption} // Handle "Yes, help me"
							>
								{t('Yes, help me')}
							</Button>
							<Button
								color='gray'
								size='xl'
								className='mt-4'
								onClick={handleNoHelp} // Handle "No, continue"
							>
								{t('No, continue')}
							</Button>
						</div>
					</div>
				) : (
					<>
						<h1 className='text-2xl mb-4 '>
							{t('What will the quiz be about')}
						</h1>
						{selectedTitle ? (
							<div className='flex flex-col w-1/3'>
								<h1 className='text-2xl text-center max-640:text-4xl my-4 font-normal'>
									{t('Here is the title and description you chose')}
								</h1>
								<div className='w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer bg-decor-3'>
									<h1 className='text-xl font-medium'>{selectedTitle}</h1>
									<p className='text-lg mt-2'>{selectedDescription}</p>
								</div>
							</div>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-640:w-[90vw]'>
								{isLoading || loadingTD ? (
									<BigDotsLoader />
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
						<div
							className={
								'flex gap-4 mt-4 h-[100%] mb-10 max-640:w-full flex-wrap max-md:items-center max-md:justify-center'
							}
						>
							<Button
								isDisabled={loadingTD}
								className='max-md:w-auto max-md:h-[50px] max-md:px-16'
								size={'3xl'}
								color={'gray'}
								onClick={prevStep}
							>
								{t('Back')}
							</Button>
							<Button
								isDisabled={loadingTD}
								className='h-[85px] w-[85px] aspect-square rounded-3xl p-0 max-md:w-[50px] max-md:h-[50px]'
								color={'gray'}
								isIconOnly
								startContent={<RegenerateIcon />}
								onClick={reGenerateTD}
							/>
							{conditionNextButton && (
								<Button
									isDisabled={loadingTD}
									size={'3xl'}
									className='max-md:w-[50px] max-md:h-[50px] max-md:px-16'
									color={'main'}
									onClick={handleNextStep}
								>
									{t('Next')}
								</Button>
							)}
						</div>
					</>
				)}
			</div>
		</DashboardLayout>
	)
}

export default GenerateTDTestStep
