'use client'
import { IQuizAnswer, useGetQuizData } from '@/entities/quiz'
import Button from '@/shared/ui/Button/Button'
import Chip from '@/shared/ui/Chip/Chip'
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
	if (loadingQuiz) return <p>Загрузка...</p>
	if (errorQuiz) return <p>Ошибка: {errorQuiz.message}</p>

	return (
		<div className='w-3/5 flex flex-col items-center justify-center'>
			<h2>{t('Test results')}</h2>
			<p className='flex items-center'>
				{t('Total percentage of correct answers:')}{' '}
				<p className='p-1 bg-success-4 rounded-xl w-min ml-4'>
					{Math.round(quizResult.totalPercents)}%
				</p>
			</p>
			<Accordion
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
							title={
								<div className='flex'>
									<p className='text-lg break-words'>
										{t('Question')} №{index + 1}
									</p>
									<Chip size='sm' className='ml-4' color={chipColor}>
										{t(chipText)}
									</Chip>
								</div>
							}
							key={answer.questionId}
							aria-label={`Accordion ${index + 1}`}
						>
							<p className='break-words'>
								<strong>Процент правильности:</strong>{' '}
								{answer.correctnessPercentage}%
							</p>
							<p className='break-words'>
								<strong>Выбранные ответы:</strong>{' '}
								{answer.selectedAnswers?.join(', ')}
							</p>
							<p className='break-words'>
								<strong>Правильные ответы:</strong>{' '}
								{answer.correctAnswers.join(', ')}
							</p>
							{question && (
								<>
									<p className='break-words'>
										<strong>Вопрос:</strong> {question.prompt}
									</p>
									{question.choices && (
										<div>
											<strong>Варианты ответов:</strong>
											<ul>
												{question.choices.map((choice, i) => (
													<li
														key={i}
														className='break-words'
														style={{
															color: answer.selectedAnswers?.includes(
																choice.content
															)
																? 'green'
																: 'black'
														}}
													>
														{choice.content}
														{answer.selectedAnswers?.includes(
															choice.content
														) && (
															<>
																{choice.correctAnswerDescription && (
																	<p className='break-words'>
																		<strong>
																			Описание правильного ответа:
																		</strong>{' '}
																		{choice.correctAnswerDescription}
																	</p>
																)}
																{choice.incorrectAnswerDescription && (
																	<p className='break-words'>
																		<strong>
																			Описание неправильного ответа:
																		</strong>{' '}
																		{choice.incorrectAnswerDescription}
																	</p>
																)}
															</>
														)}
													</li>
												))}
											</ul>
										</div>
									)}
								</>
							)}
							{answer.matchingAnswers.length > 0 && (
								<div>
									<strong>Совпадения:</strong>
									<ul>
										{answer.matchingAnswers.map((match, i) => (
											<li key={i} className='break-words'>
												{match.left} - {match.right}
											</li>
										))}
									</ul>
								</div>
							)}
						</AccordionItem>
					)
				})}
			</Accordion>
			{handleNext && (
				<Button
					className='mt-4 max-lg:w-[140px] max-lg:h-[60px] max-640:!w-[60vw] max-sm:w-[200px] max-sm:h-[100px] '
					size={'3xl'}
					color={'main'}
					onClick={handleNext}
				>
					{t('Next')}
				</Button>
			)}
			<Confetti recycle={false} width={width} height={height} />
		</div>
	)
}

export default QuizAnswer
