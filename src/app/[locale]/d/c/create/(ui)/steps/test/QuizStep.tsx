import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz, useQuizStore } from '@/features/quiz'
import { getQuizIndependentRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useUnifiedStore from '../../../(model)/unified.state'

const QuizStep = () => {
	const t = useTranslations('CreateTest')
	const { createQuiz, dataCreateQuiz, errorCreateQuiz, loadingCreateQuiz } =
		useCreateIndependentQuizWithAI()
	const router = useRouter()
	const {
		nextStep,
		setQuizId,
		quizId,
		selectedDescription,
		selectedTitle,
		courseId
	} = useUnifiedStore()
	const { quizResultId } = useQuizStore()

	const handleNext = () => {
		nextStep()
	}

	useEffect(() => {
		if (quizId) {
			router.replace(getQuizIndependentRoute(quizId))
		} else {
			createQuiz({
				variables: {
					dto: {
						courseTitle: selectedTitle,
						courseDescription: selectedDescription,
						toCheckKnowledge: false
					}
				}
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (dataCreateQuiz) {
			setQuizId(dataCreateQuiz.id)
			router.replace(getQuizIndependentRoute(dataCreateQuiz.id))
		}
	}, [dataCreateQuiz, router, setQuizId])

	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center justify-center'>
				{loadingCreateQuiz && <DotsLoader />}
				{errorCreateQuiz && (
					<h1 className='text-lg font-bold text-error-10'>
						{t('An error occurred while creating the test')}
					</h1>
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

export default QuizStep
