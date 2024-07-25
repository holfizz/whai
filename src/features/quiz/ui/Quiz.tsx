'use client'
import { useGetQuizData } from '@/entities/quiz'
import { useParams } from 'next/navigation'
import QuizBody from './QuizBody/QuizBody'
import QuizHead from './QuizHead/QuizHead'

const Quiz = () => {
	const { quizId } = useParams<{ quizId: string }>()
	const { quizData, loadingQuiz } = useGetQuizData(quizId)
	console.log(quizData)
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
