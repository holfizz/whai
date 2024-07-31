'use client'
import { useGenerateTD } from '@/entities/titleDescription'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'
import ResetButton from '../../resetButton'

const GenerateTDTestStep = (): React.JSX.Element => {
	const t = useTranslations('CreateTest')
	const {
		promptContent,
		step,
		prevStep,
		nextStep,
		setQuizId,
		quizId,
		selectedTitle,
		selectedDescription,
		setSelectedTitle,
		setSelectedDescription
	} = useUnifiedStore()

	const { mutationTD, mutationTDData, errorTD, loadingTD } = useGenerateTD()

	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	)
	const [requestSuccessful, setRequestSuccessful] = useState(false)

	const handleGenerateTD = useCallback(async () => {
		if (!loadingTD && !errorTD && !requestSuccessful) {
			try {
				if (!selectedTitle) {
					await mutationTD({
						variables: {
							dto: {
								userRequest: promptContent,
								type: 'TEST',
								conversationId: quizId
							}
						}
					})
					setRequestSuccessful(true)
				}
			} catch (error) {
				console.error('Error generating title and description: ', error)
			}
		}
	}, [
		loadingTD,
		errorTD,
		requestSuccessful,
		selectedTitle,
		mutationTD,
		promptContent,
		quizId
	])

	useEffect(() => {
		handleGenerateTD()
	}, [handleGenerateTD])

	if (step !== 3 && promptContent.length === 0) {
		prevStep()
		return <></>
	}

	if (errorTD) {
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
			{mutationTDData &&
				mutationTDData.map((td, index) => (
					<div
						key={index}
						onClick={() => setSelectedCardIndex(index)}
						className={`w-full h-auto min-h-30 p-4 rounded-2xl cursor-pointer ${
							selectedCardIndex === index ? 'bg-decor-2' : 'bg-decor-3'
						}`}
					>
						<h1 className='text-xl font-medium'>{td.title}</h1>
						<p className='text-lg mt-2'>{td.description}</p>
					</div>
				))}
		</>
	)

	const handleNextStep = () => {
		if (selectedCardIndex !== null) {
			const selectedTD = mutationTDData[selectedCardIndex]
			setSelectedTitle(selectedTD.title)
			setSelectedDescription(selectedTD.description)
			nextStep()
		} else if (selectedTitle && quizId) {
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
				<h1 className='text-2xl'>{t('Which test description fits best?')}</h1>
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
						{mutationTDData && !requestSuccessful ? <Loader /> : <DataCards />}
					</div>
				)}
				<div className={'flex gap-4 mt-4'}>
					<Button size={'3xl'} color={'gray'} onClick={prevStep}>
						{t('Back')}
					</Button>
					{conditionNextButton && (
						<Button size={'3xl'} color={'main'} onClick={handleNextStep}>
							{t('Next')}
						</Button>
					)}
					<ResetButton />
				</div>
			</div>
		</DashboardLayout>
	)
}

export default GenerateTDTestStep
