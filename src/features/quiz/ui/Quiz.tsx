'use client'
import { useGetLastQuizResult, useGetQuizData } from '@/entities/quiz'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import QuizAnswers from './QuizAnswers/QuizAnswers'
import QuizBody from './QuizBody/QuizBody'
import QuizHead from './QuizHead/QuizHead'

const Quiz = () => {
	const t = useTranslations('Quiz')
	const { quizId } = useParams<{ quizId: string }>()
	const { back } = useRouter()
	const { quizData, loadingQuiz } = useGetQuizData(quizId)

	const { lastQuizResult, errorLastQuizResult, loadingLastQuizResult } =
		useGetLastQuizResult(quizId)

	if (loadingQuiz || loadingLastQuizResult) return <p>Загрузка...</p>

	return (
		<div className='w-full '>
			{quizData && !lastQuizResult && (
				<>
					<QuizHead quizData={quizData} />
					<QuizBody quizData={quizData} />
				</>
			)}
			<div className='w-full flex items-center flex-col'>
				{lastQuizResult && <QuizAnswers quizResult={lastQuizResult} />}
				<Button onClick={back} size='3xl' color={'main'}>
					{t('Back')}
				</Button>
			</div>
		</div>
	)
}

export default Quiz
