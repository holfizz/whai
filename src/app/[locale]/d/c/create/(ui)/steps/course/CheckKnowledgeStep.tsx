import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
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
				{(loadingCreateQuiz || loadingFetchingHistory) && (
					<>
						<h1 className='text-2xl font-bold'>
							{t('We continue to create the quiz')}
						</h1>
						<h3 className='text-sm text-gray-3 mt-4'>
							{t(
								'We continue to create the courseThis will take a couple of minutes Please do not close the page'
							)}
						</h3>
						<BigDotsLoader className='mt-8' />
					</>
				)}
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
				{quizId && (
					<>
						<h1 className='text-lg font-bold'>
							{t("Let's test your knowledge")}
						</h1>
						<h3 className='text-medium font-medium text-gray-500 mb-14'>
							{t(
								'Take a short test to determine the difficulty level of the course'
							)}
						</h3>
						<Quiz quizIdProp={quizId} handleNext={handleNext} />
					</>
				)}
			</div>
		</DashboardLayout>
	)
}

export default CheckKnowledgeStep
