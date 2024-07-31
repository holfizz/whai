import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz, useQuizStore } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'

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
	} = useUnifiedStore()
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
						courseAIHistoryId: courseAIHistory.id,
						toCheckKnowledge: true
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

	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center justify-center'>
				{(loadingCreateQuiz || loadingFetchingHistory) && <DotsLoader />}
				{(errorFetchingHistory || errorCreateQuiz) && (
					<h1 className='text-lg font-bold text-error-10'>
						{t('An error occurred while creating the test')}
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
