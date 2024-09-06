'use client'
import { IQuizAnswer, useGetQuizData } from '@/entities/quiz'
import RegenerateIcon from '@/shared/assets/icons/Regenerate'
import Button from '@/shared/ui/Button/Button'
import Chip from '@/shared/ui/Chip/Chip'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import type { Selection } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useWindowSize } from '@react-hook/window-size'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useQuizStore } from '../../model/quiz.store'

interface QuizResultProps {
	quizResult: {
		quizId: string
		totalPercents: number
		userAnswers: {
			questionId: string
			correctAnswers: string[]
			correctnessPercentage: number
			selectedAnswers: string[] | null
			matchingAnswers: { left: string; right: string }[]
		}[]
	}
}

const getChipColor = (correctnessPercentage: number) => {
	if (correctnessPercentage === 100) return 'success'
	if (correctnessPercentage === 0) return 'error'
	return 'warning'
}

const getChipText = (
	correctnessPercentage: number
): 'Partial' | 'Incorrect' | 'Correct' => {
	if (correctnessPercentage === 100) return 'Correct'
	if (correctnessPercentage === 0) return 'Incorrect'
	return 'Partial'
}
const replaceClozeLineWithUnderscores = (text: string) => {
	return text.replace(/<ClozeLine\s*\/?>/g, '________')
}
const QuizAnswer = ({
	quizResult,
	handleNext
}: {
	quizResult: IQuizAnswer
	handleNext?: () => void
}) => {
	const t = useTranslations('Quiz')
	const [width, height] = useWindowSize()
	const { resetState } = useQuizStore()
	const { quizData, errorQuiz, loadingQuiz } = useGetQuizData(quizResult.quizId)
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<string>())

	useEffect(() => {
		resetState()
	}, [resetState])

	// if (loadingQuiz) return <p>Loading...</p>
	// if (errorQuiz) return <p>Error: {errorQuiz.message}</p>

	const renderQuestionAnswers = (answer: any) => {
		if (answer.matchingAnswers && answer.matchingAnswers.length > 0) {
			// Matching question type
			return (
				<div>
					<strong>{t('Answers')}:</strong>
					<ul className='ml-4 text-secondary'>
						{answer.matchingAnswers.map(
							(match: { left: string; right: string }, i: number) => (
								<li key={i} className='break-words'>
									{match.left} - {match.right}
								</li>
							)
						)}
					</ul>
				</div>
			)
		}
	}
	return (
		<div className='max-md:w-[75vw] max-640:w-[80vw] w-[60vw] flex flex-col items-center justify-center'>
			{loadingQuiz && (
				<div className='w-full flex items-center justify-center flex-col'>
					<BigDotsLoader />
				</div>
			)}
			{errorQuiz && (
				<div className='flex flex-col justify-center items-center h-full w-full text-accent'>
					<h1 className='text-2xl mb-4 '>
						{t('Error when summing up results')}
					</h1>
					<h3 className='text-lg mb-4 text-error-text px-6 py-3 bg-error-1 rounded-2xl'>
						{t('Oops Error please try again')}
					</h3>

					<div className='w-[30%] flex mt-10 items-center justify-center'>
						<Button
							className='ml-5 h-[70px] w-[70px] rounded-3xl p-0'
							color={'gray'}
							isIconOnly
							startContent={<RegenerateIcon />}
							onClick={() => window.location.reload()}
						/>
					</div>
				</div>
			)}
			<h2 className='text-3xl max-md:text-4xl'>{t('Test results')}</h2>
			<p className='flex items-center'>
				<div className='items-start justify-start text-lg font-semibold mt-8 gap-2 max-md:w-[80vw] my-10'>
					<span className='text-decor-2 text-7xl font-bold'>
						{Math.round(quizResult.totalPercents)}
					</span>
					<span className='text-gray-3 text-3xl'>%</span>
				</div>
			</p>
			<Accordion
				className='max-md:w-[75vw] max-640:w-[80vw] w-[60vw]'
				selectedKeys={selectedKeys}
				onSelectionChange={setSelectedKeys}
			>
				{quizResult.userAnswers.map((answer, index) => {
					const question = quizData?.questions.find(
						q => q.id === answer.questionId
					)
					const chipColor = getChipColor(answer.correctnessPercentage)
					const chipText = getChipText(answer.correctnessPercentage)

					return (
						<AccordionItem
							className='max-md:w-[75vw] max-640:w-[80vw] w-[60vw]'
							title={
								<div className='flex'>
									<p className='text-lg break-words max-md:text-xl'>
										{t('Question')} №{index + 1}
									</p>
									<Chip
										size='sm'
										className='ml-4 max-md:text-lg'
										color={chipColor}
									>
										{t(chipText)}
									</Chip>
								</div>
							}
							key={answer.questionId}
							aria-label={`Accordion ${index + 1}`}
						>
							{question && (
								<>
									<p className='break-words max-md:text-xl'>
										<strong>
											{replaceClozeLineWithUnderscores(question.prompt)}
										</strong>
									</p>
									{question.choices.length > 0 && (
										<div className='max-md:text-xl'>
											<strong>{t('Options')}:</strong>
											<ul className='ml-4'>
												{question.choices.length > 0 &&
													question.choices.map((choice, i) => {
														const isSelected = answer.selectedAnswers?.includes(
															choice.content
														)
														const isCorrect = answer.correctAnswers.includes(
															choice.content
														)
														return (
															<li
																key={i}
																className={`break-words ${
																	isCorrect
																		? 'text-success-text'
																		: isSelected
																		? 'text-error-text'
																		: 'text-secondary'
																}`}
															>
																{choice.content}
															</li>
														)
													})}
											</ul>
										</div>
									)}
									{question.choices.length <= 0 && (
										<div className='flex flex-col justify-center'>
											<li
												className={`break-words ${
													answer.selectedAnswers[0] === answer.correctAnswers[0]
														? 'text-success-text'
														: 'text-error-text'
												}`}
											>
												{answer.selectedAnswers[0]}
											</li>
											{!question?.matchingInteraction?.right && (
												<span className='text-secondary'>
													{t('Answer')}: {answer.correctAnswers[0]}
												</span>
											)}
										</div>
									)}
									{renderQuestionAnswers(answer)}
								</>
							)}
						</AccordionItem>
					)
				})}
			</Accordion>
			{handleNext && (
				<Button
					className='max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw] max-sm:w-[200px] max-md:h-[50px] mt-32 max-md:text-xl'
					size={'3xl'}
					color={'main'}
					onClick={handleNext}
				>
					{t('Next')}
				</Button>
			)}
			{!errorQuiz && <Confetti recycle={false} width={width} height={height} />}
		</div>
	)
}

export default QuizAnswer
