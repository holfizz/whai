import { useGetQuizData } from '@/entities/quiz'
import Chip from '@/shared/ui/Chip/Chip'
import type { Selection } from '@nextui-org/react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import React from 'react'

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

const QuizResult: React.FC<QuizResultProps> = ({ quizResult }) => {
	const t = useTranslations('Quiz')
	const { quizData, errorQuiz, loadingQuiz } = useGetQuizData(quizResult.quizId)
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
		new Set<string>()
	)

	if (loadingQuiz) return <p>Загрузка...</p>
	if (errorQuiz) return <p>Ошибка: {errorQuiz.message}</p>

	return (
		<div>
			<h2>Результаты теста</h2>
			<p>Общий процент правильных ответов: {quizResult.totalPercents}%</p>
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
									<p className='text-lg'>
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
							<p>
								<strong>Процент правильности:</strong>{' '}
								{answer.correctnessPercentage}%
							</p>
							<p>
								<strong>Выбранные ответы:</strong>{' '}
								{answer.selectedAnswers?.join(', ')}
							</p>
							<p>
								<strong>Правильные ответы:</strong>{' '}
								{answer.correctAnswers.join(', ')}
							</p>
							{question && (
								<>
									<p>
										<strong>Вопрос:</strong> {question.prompt}
									</p>
									{question.choices && (
										<div>
											<strong>Варианты ответов:</strong>
											<ul>
												{question.choices.map((choice, i) => (
													<li
														key={i}
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
																	<p>
																		<strong>
																			Описание правильного ответа:
																		</strong>{' '}
																		{choice.correctAnswerDescription}
																	</p>
																)}
																{choice.incorrectAnswerDescription && (
																	<p>
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
											<li key={i}>
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
		</div>
	)
}

export default QuizResult
