import { useCreateIndependentQuizWithAI } from '@/entities/quiz'
import { Quiz, useQuizStore } from '@/features/quiz'
import { getQuizIndependentRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
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
	const hasCreatedQuiz = useRef(false) // Используем useRef для отслеживания состояния

	const handleNext = () => {
		nextStep()
	}

	useEffect(() => {
		if (quizId) {
			router.replace(getQuizIndependentRoute(quizId))
		} else if (!hasCreatedQuiz.current) {
			// Проверка, чтобы запрос выполнялся только один раз
			createQuiz({
				variables: {
					dto: {
						courseTitle: selectedTitle,
						courseDescription: selectedDescription,
						toCheckKnowledge: false
					}
				}
			})
			hasCreatedQuiz.current = true // Устанавливаем флаг после выполнения запроса
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quizId, router, createQuiz, selectedTitle, selectedDescription])

	useEffect(() => {
		if (dataCreateQuiz) {
			setQuizId(dataCreateQuiz.id)
			router.replace(getQuizIndependentRoute(dataCreateQuiz.id))
		}
	}, [dataCreateQuiz, router, setQuizId])
	useEffect(() => {
		if (errorCreateQuiz) {
			toast.error(t('An error occurred while creating the test'))
		}
	}, [errorCreateQuiz, t])
	return (
		<DashboardLayout>
			<div className='w-full flex flex-col items-center justify-center'>
				{loadingCreateQuiz && <BigDotsLoader />}
				{quizId ? <Quiz quizIdProp={quizId} /> : <p>Создание викторины...</p>}
				{quizResultId && (
					<Button size={'3xl'} color={'main'} onClick={handleNext}>
						{t('Next')}
					</Button>
				)}
			</div>
			<Toaster position='top-right' reverseOrder={false} />
		</DashboardLayout>
	)
}

export default QuizStep
