import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'

const CheckKnowledgeStep = () => {
	const t = useTranslations('CreateCourse')
	const { resetState } = useUnifiedStore()
	const { createQuiz, dataCreateQuiz, errorCreateQuiz, loadingCreateQuiz } =
		useCreateIndependentQuizWithAI()
	const {
		courseId,
		nextStep,
		setQuizId,
		quizId,
		quizResultId,
		selectedDescription,
		selectedTitle
	} = useUnifiedStore()
	const handleNext = () => {
		nextStep()
	}
	const { courseAIHistory, errorFetchingHistory, loadingFetchingHistory } =
		useGetCourseAIHistoryByCourseId(courseId)

	useEffect(() => {
		const req = async () => {
			if (!quizId && courseId && courseAIHistory?.id) {
				await createQuiz({
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
		}
		req()
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
					<>
						<h1 className='text-lg font-bold text-error-10'>
							{t('An error occurred while creating the test')}
						</h1>
						<Button
							className='mt-4'
							size={'3xl'}
							color={'secondary'}
							onClick={handleNext}
						>
							{t('Try again')}
						</Button>
					</>
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
				<h1>{quizId}</h1>
				{quizId ? (
					<Quiz quizIdProp={quizId} handleNext={handleNext} />
				) : (
					<p>Создание викторины...</p>
				)}
			</div>
		</DashboardLayout>
	)
}

export default CheckKnowledgeStep
