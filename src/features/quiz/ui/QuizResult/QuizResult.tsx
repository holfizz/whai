'use client'
import { SAVE_QUIZ_RESULT } from '@/entities/quiz'
import { useMutation } from '@apollo/client'
import { useWindowSize } from '@react-hook/window-size'
import { useEffect } from 'react'
import Confetti from 'react-confetti'
import { useQuizStore } from '../../model/quiz.store'

const QuizResult = ({ quizId, courseId, subtopicId }) => {
	const [saveQuizResult, { data, loading, error }] =
		useMutation(SAVE_QUIZ_RESULT)
	const { selectedAnswers, matchingAnswers } = useQuizStore()

	const [width, height] = useWindowSize()

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

	return (
		<div>
			<h2>Результаты теста</h2>
			{data && (
				<>
					<Confetti recycle={false} width={width} height={height} />
					<pre>{JSON.stringify(data.saveQuizResult, null, 2)}</pre>
				</>
			)}
		</div>
	)
}

export default QuizResult
