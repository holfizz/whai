'use client'
import { SAVE_QUIZ_RESULT } from '@/entities/quiz'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useQuizStore } from '../../model/quiz.store'

const QuizResult = ({ quizId, courseId, subtopicId }) => {
	const [saveQuizResult, { data, loading, error }] =
		useMutation(SAVE_QUIZ_RESULT)
	const { selectedAnswers, matchingAnswers, resetState } = useQuizStore()

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
				saveQuizResult({
					variables: {
						saveQuizResultInput: {
							quizId,
							courseId,
							subtopicId,
							userAnswers
						}
					}
				})
				window.location.reload()
			} catch (err) {
				console.error('Error saving quiz result:', err)
			}
		}
		resetState()

		saveResults()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAnswers, matchingAnswers, saveQuizResult])

	if (loading) return <p>Сохранение результатов...</p>
	if (error) return <p>Ошибка при сохранении результатов: {error.message}</p>
}

export default QuizResult
