'use client'
import useUnifiedStore from '@/app/[locale]/d/c/create/(model)/unified.state'
import { useGetLastQuizResult, useGetQuizData } from '@/entities/quiz'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useQuizStore } from '../model/quiz.store'
import QuizAnswers from './QuizAnswers/QuizAnswers'
import QuizBody from './QuizBody/QuizBody'
import QuizHead from './QuizHead/QuizHead'

const Quiz = ({
	quizIdProp,
	handleNext
}: {
	quizIdProp?: string
	handleNext?: () => void
}) => {
	const t = useTranslations('Quiz')
	const { quizId } = useParams<{ quizId: string }>()
	const { setCurrentQuizId, resetState, currentQuizId } = useQuizStore()
	const { quizData, loadingQuiz } = useGetQuizData(quizIdProp || quizId)
	const { lastQuizResult, loadingLastQuizResult } = useGetLastQuizResult(
		quizIdProp || quizId
	)
	const { setQuizResultId } = useUnifiedStore()

	useEffect(() => {
		if (quizIdProp || quizId) {
			const newQuizId = quizIdProp || quizId
			if (currentQuizId !== newQuizId) {
				resetState()
				setCurrentQuizId(newQuizId) // Use the function to update the quiz ID
			}
		}
	}, [quizIdProp, quizId, currentQuizId, resetState, setCurrentQuizId])

	useEffect(() => {
		if (lastQuizResult) {
			setQuizResultId(lastQuizResult.id)
		}
	}, [lastQuizResult, setQuizResultId])

	if (loadingQuiz || loadingLastQuizResult) return <p>Загрузка...</p>

	return (
		<div className='w-full flex gap-5 flex-col'>
			{quizData && !lastQuizResult && (
				<>
					<QuizHead quizData={quizData} />
					<QuizBody quizData={quizData} />
				</>
			)}
			<div className='w-full flex items-center flex-col'>
				{lastQuizResult && (
					<QuizAnswers handleNext={handleNext} quizResult={lastQuizResult} />
				)}
			</div>
		</div>
	)
}

export default Quiz
