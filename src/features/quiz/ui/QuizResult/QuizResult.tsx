'use client'
import { SAVE_QUIZ_RESULT } from '@/entities/quiz'
import Chip from '@/shared/ui/Chip/Chip'
import { useMutation } from '@apollo/client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { useWindowSize } from '@react-hook/window-size'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useQuizStore } from '../../model/quiz.store'

interface QuizResultProps {
	quizId: string
	courseId: string
	subtopicId: string | null
}

const QuizResult: React.FC<QuizResultProps> = ({
	quizId,
	courseId,
	subtopicId
}) => {
	const { setQuizResultId } = useQuizStore()

	const [saveQuizResult, { data, loading, error }] =
		useMutation(SAVE_QUIZ_RESULT)
	const { selectedAnswers, matchingAnswers } = useQuizStore()

	const [width, height] = useWindowSize()
	const t = useTranslations('Quiz')
	useEffect(() => {
		setQuizResultId(data.id)
	}, [data.id, setQuizResultId])
	useEffect(() => {
		const saveResults = async () => {
			const userAnswers: any = Object.entries(selectedAnswers).map(
				([questionId, answers]) => ({
					questionId,
					selectedAnswers: answers
				})
			)

			Object.entries(matchingAnswers).forEach(([questionId, answers]) => {
				const index = userAnswers.findIndex(
					answer => answer.questionId === questionId
				)
				if (index !== -1) {
					delete userAnswers[index].selectedAnswers
					userAnswers[index].matchingAnswers = answers.map(a => ({
						left: a.left,
						right: a.right
					}))
				} else {
					userAnswers.push({
						questionId,
						matchingAnswers: answers.map(a => ({
							left: a.left,
							right: a.right
						})),
						selectedAnswers: []
					})
				}
			})

			try {
				const result = await saveQuizResult({
					variables: {
						saveQuizResultInput: {
							quizId,
							courseId,
							subtopicId,
							userAnswers
						}
					}
				})

				console.log('Quiz result saved:', result.data.saveQuizResult)
			} catch (err) {
				console.error('Error saving quiz result:', err)
			}
		}

		saveResults()
	}, [
		quizId,
		courseId,
		subtopicId,
		selectedAnswers,
		matchingAnswers,
		saveQuizResult
	])

	if (loading) return <p>Сохранение результатов...</p>
	if (error) return <p>Ошибка при сохранении результатов: {error.message}</p>

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

	return (
		<div className='w-3/5'>
			<Confetti recycle={false} width={width} height={height} />

			<h2>{t('Test results')}</h2>
			<p>
				{t('Total percentage of correct answers:')} {data?.totalPercents || 0}%
			</p>
			<Accordion>
				{data &&
					data?.userAnswers?.map((answer, index) => (
						<AccordionItem
							title={
								<div className='flex'>
									<p className='text-lg break-words'>
										{t('Question')} №{index + 1}
									</p>
									<Chip
										size='sm'
										className='ml-4'
										color={getChipColor(answer.correctnessPercentage)}
									>
										{t(getChipText(answer.correctnessPercentage))}
									</Chip>
								</div>
							}
							key={answer.questionId}
							aria-label={`Accordion ${index + 1}`}
						>
							<p className='break-words'>
								<strong>Процент правильности:</strong>{' '}
								{Math.round(answer.correctnessPercentage)}%
							</p>
							<p className='break-words'>
								<strong>Выбранные ответы:</strong>{' '}
								{answer.selectedAnswers?.join(', ')}
							</p>
							<p className='break-words'>
								<strong>Правильные ответы:</strong>{' '}
								{/* Replace with actual correct answers if available */}
							</p>
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
					))}
			</Accordion>
		</div>
	)
}

export default QuizResult
