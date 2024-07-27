'use client'
import { useGetLastQuizResult, useGetQuizData } from '@/entities/quiz'
import { useParams } from 'next/navigation'
import QuizAnswers from './QuizAnswers/QuizAnswers'
import QuizBody from './QuizBody/QuizBody'
import QuizHead from './QuizHead/QuizHead'

const Quiz = () => {
	const { quizId } = useParams<{ quizId: string }>()

	const { quizData, loadingQuiz } = useGetQuizData(quizId)

	const { lastQuizResult, errorLastQuizResult, loadingLastQuizResult } =
		useGetLastQuizResult(quizId)

	if (loadingQuiz || loadingLastQuizResult) return <p>Загрузка...</p>

	return (
		<div>
			{quizData && !lastQuizResult && (
				<>
					<QuizHead quizData={quizData} />
					<QuizBody quizData={quizData} />
				</>
			)}
			{lastQuizResult && <QuizAnswers quizResult={lastQuizResult} />}
		</div>
	)
}

export default Quiz
