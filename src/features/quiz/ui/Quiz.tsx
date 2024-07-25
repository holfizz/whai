'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetQuizData } from '@/entities/quiz'
import QuizHead from './QuizHead/QuizHead'
import QuizBody from './QuizBody/QuizBody'

const Quiz = () => {
	const { quizId } = useParams<{ quizId: string }>()
	const { quizData, loadingQuiz } = useGetQuizData(quizId)

	return (
		<div>
			{quizData && (
				<>
					<QuizHead quizData={quizData} />
					<QuizBody quizData={quizData} />
				</>
			)}
		</div>
	)
}

export default Quiz
