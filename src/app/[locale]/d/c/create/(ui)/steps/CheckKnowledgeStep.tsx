import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz, useQuizStore } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { LoaderCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import useCourseStore from '../../(model)/create-page.store'

const CheckKnowledgeStep = () => {
	const t = useTranslations('CreateCourse')
	const { createQuiz, dataCreateQuiz, errorCreateQuiz, loadingCreateQuiz } =
		useCreateIndependentQuizWithAI()
	const {
		courseId,
		nextStep,
		setQuizId,
		quizId,
		selectedDescription,
		selectedTitle
	} = useCourseStore()
	const { quizResultId } = useQuizStore()
	const handleNext = () => {
		nextStep()
	}
	const { courseAIHistory, errorFetchingHistory, loadingFetchingHistory } =
		useGetCourseAIHistoryByCourseId(courseId)

	useEffect(() => {
		if (!quizId && courseId && courseAIHistory?.id) {
			createQuiz({
				variables: {
					dto: {
						courseTitle: selectedTitle,
						courseDescription: selectedDescription,
						courseAIHistoryId: courseAIHistory.id
					}
				}
			})
		}
	}, [
		quizId,
		courseId,
		createQuiz,
		selectedDescription,
		selectedTitle,
		courseAIHistory
	])

	useEffect(() => {
		if (dataCreateQuiz) {
			setQuizId(dataCreateQuiz.id)
		}
	}, [dataCreateQuiz, setQuizId])

	if (errorCreateQuiz) return <p>Ошибка: {errorCreateQuiz.message}</p>
	if (errorFetchingHistory || errorCreateQuiz)
		return (
			<p>
				Ошибка при получении истории AI курса: {errorFetchingHistory.message}
			</p>
		)

	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center justify-center'>
				{(loadingCreateQuiz || loadingFetchingHistory) && <LoaderCircle />}
				{(errorFetchingHistory || errorCreateQuiz) && (
					<h1 className='text-lg font-bold text-error-10'>
						{errorFetchingHistory.message}
						{errorCreateQuiz.message}
					</h1>
				)}
				{dataCreateQuiz && (
					<>
						<h1 className='text-lg font-bold'>
							{t("Let's test your knowledge")}
						</h1>
						<h3 className='text-medium font-medium text-gray-500'>
							{t(
								'Take a short test to determine the difficulty level of the course'
							)}
						</h3>
					</>
				)}
				{quizId ? <Quiz quizIdProp={quizId} /> : <p>Создание викторины...</p>}
				{quizResultId && (
					<Button size={'3xl'} color={'main'} onClick={handleNext}>
						{t('Next')}
					</Button>
				)}
			</div>
		</DashboardLayout>
	)
}

export default CheckKnowledgeStep
