import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz } from '@/features/quiz'
import { getSubscriptionsRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
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
				{errorCreateQuiz && (
					<>
						{(() => {
							switch (errorCreateQuiz.message) {
								case 'You have reached your quiz creation limit for this month.':
									return (
										<div className='flex flex-col gap-5 w-[60%] max-md:w-[80%] max-sm:w-[90%] items-center justify-center mb-14'>
											<h1 className='text-lg text-error-10 text-center'>
												{t(
													'You have reached your creation limit, subscribe to continue using the service'
												)}
											</h1>
											<Button
												color='accent'
												as={Link}
												className='mt-4 rounded-xl w-[200px]'
												href={getSubscriptionsRoute()}
											>
												{t('Subscribe')}
											</Button>
										</div>
									)
								default:
									return (
										<h1 className='text-lg text-error-10 text-center'>
											{t('An error occurred while creating the test')}
										</h1>
									)
							}
						})()}
						<Button
							className='mt-4'
							size={'3xl'}
							color={'secondary'}
							onClick={() => {
								window.location.reload()
							}}
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
