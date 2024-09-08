'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import {
	useCreateQuizWithAI,
	useGetQuiz
} from '@/entities/quiz/model/quiz.queries'
import { Quiz } from '@/features/quiz'
import { getCourseByIdRoute } from '@/shared/const/router'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const QuizPage = () => {
	const { quizId } = useParams<{ quizId: string }>()
	const router = useRouter()
	const t = useTranslations('Quiz')
	const { quizData, errorQuiz, loadingQuiz } = useGetQuiz(quizId)
	const {
		createQuizWithAI,
		dataCreateQuizWithAI,
		errorCreateQuizWithAI,
		loadingCreateQuizWithAI
	} = useCreateQuizWithAI()
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(
		quizData?.courseId
	)
	const [isQuizCreated, setIsQuizCreated] = useState(false)

	useEffect(() => {
		if (
			quizId &&
			quizData &&
			courseAIHistory &&
			!isQuizCreated &&
			!quizData?.questions?.length
		) {
			createQuizWithAI({
				variables: {
					QuizWithAIInput: {
						id: quizId,
						name: quizData.name,
						description: quizData.description,
						courseAIHistoryId: courseAIHistory?.id,
						courseId: quizData?.courseId,
						subtopicId: quizData?.subtopicId
					}
				}
			})
				.then(({ data }) => {
					if (data?.createQuizWithAI) {
						setIsQuizCreated(true)
					}
				})
				.catch(error => {
					console.error(error)
				})
		}
	}, [quizId, quizData, courseAIHistory, isQuizCreated, createQuizWithAI])

	let content

	if (loadingQuiz || loadingCreateQuizWithAI) {
		content = (
			<>
				<div className='mt-10 flex flex-col items-center w-full justify-center'>
					<h1 className='text-2xl'>{t('Quiz creation in progress')}</h1>
					<p className='text-lg text-secondary my-5'>
						{t(
							'Please do not close the page It will take no more than 2 minutes'
						)}
					</p>
					<BigDotsLoader />
				</div>
			</>
		)
	} else if (errorQuiz || errorCreateQuizWithAI) {
		content = (
			<>
				<h1>{t('There was an error loading the quiz or creating it')}</h1>
				<Button
					className='mt-8'
					onClick={() => window.location.reload()}
					color='main'
					size='3xl'
				>
					{t('To try one more time')}
				</Button>
			</>
		)
	} else {
		if (quizData?.questions?.length) {
			content = (
				<Quiz
					handleNext={() => {
						router.replace(getCourseByIdRoute(quizData.courseId))
					}}
				/>
			)
		} else if (isQuizCreated) {
			content = <Quiz quizIdProp={dataCreateQuizWithAI?.id} />
		}
	}

	return (
		<DashboardLayout>
			<div className='w-full flex items-center flex-col'>{content}</div>
		</DashboardLayout>
	)
}

export default QuizPage
