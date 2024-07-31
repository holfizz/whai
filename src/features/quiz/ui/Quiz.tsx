'use client'
import useUnifiedStore from '@/app/[locale]/d/c/create/(model)/unified.state'
import { useGetLastQuizResult, useGetQuizData } from '@/entities/quiz'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useQuizStore } from '../model/quiz.store'
import QuizAnswers from './QuizAnswers/QuizAnswers'
import QuizBody from './QuizBody/QuizBody'
import QuizHead from './QuizHead/QuizHead'

const Quiz = ({ quizIdProp }: { quizIdProp?: string }) => {
	const t = useTranslations('Quiz')
	const { quizId } = useParams<{ quizId: string }>()
	const { back } = useRouter()
	const { setQuizResultId } = useQuizStore()
	const { quizData, loadingQuiz } = useGetQuizData(quizIdProp || quizId)
	const { resetState } = useUnifiedStore()
	const { lastQuizResult, loadingLastQuizResult } = useGetLastQuizResult(
		quizIdProp || quizId
	)

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
				{lastQuizResult && <QuizAnswers quizResult={lastQuizResult} />}
			</div>
			<div className='w-full flex justify-center'>
				<Button
					onClick={() => {
						back()
						resetState()
					}}
					size='3xl'
					color={'main'}
				>
					{t('Back')}
				</Button>
			</div>
		</div>
	)
}

export default Quiz
