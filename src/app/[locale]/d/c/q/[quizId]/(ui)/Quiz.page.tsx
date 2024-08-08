'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import {
	useCreateQuizWithAI,
	useGetQuiz
} from '@/entities/quiz/model/quiz.queries'
import { Quiz } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { Skeleton } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const QuizPage = () => {
	const { quizId } = useParams<{ quizId: string }>()
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
				<div className='mt-10 flex items-center w-full justify-center'>
					<h1>{t('Quiz creation in progress')}</h1>
					<DotsLoader />
				</div>
				<Skeleton
					className={'mt-10 rounded-xl'}
					style={{ width: '80%', height: 60 }}
				/>
				<Skeleton
					className={'mt-5 rounded-xl'}
					style={{ width: '30%', height: 30 }}
				/>
				<div className='grid grid-cols-2 gap-5 w-full mt-36'>
					<Skeleton className={'rounded-xl'} style={{ height: 70 }} />
					<Skeleton className={'rounded-xl'} style={{ height: 70 }} />
					<Skeleton className={'rounded-xl'} style={{ height: 70 }} />
					<Skeleton className={'rounded-xl'} style={{ height: 70 }} />
				</div>
				<Skeleton
					className={'mt-16 rounded-xl'}
					style={{ width: '40%', height: 100 }}
				/>
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
			content = <Quiz />
		} else if (isQuizCreated) {
			content = <Quiz quizIdProp={dataCreateQuizWithAI?.id} />
		}
	}

	return (
		<DashboardLayout>
			<div
				className='w-full flex items-center flex-col'
				style={{ height: 'calc(100vh - var(--navbar-height))' }}
			>
				{content}
			</div>
		</DashboardLayout>
	)
}

export default QuizPage
