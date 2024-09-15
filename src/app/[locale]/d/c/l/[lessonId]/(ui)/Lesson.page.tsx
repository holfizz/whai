'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useGetLessonContent } from '@/entities/lesson'
import { CREATE_LESSON_WITH_AI } from '@/entities/lesson/model/lesson.queries'
import { Lesson } from '@/features/lesson'
import logger from '@/shared/lib/utils/logger'
import Button from '@/shared/ui/Button/Button'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useMutation } from '@apollo/client'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const LessonPage = () => {
	const t = useTranslations('Lesson')
	const { lessonId } = useParams<{ lessonId: string }>()

	const { lessonContentData, errorLessonContent, loadingLessonContent } =
		useGetLessonContent(lessonId)
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(
		lessonContentData?.courseId
	)

	const [
		createLessonWithAI,
		{ loading: creatingLesson, error: createLessonError }
	] = useMutation(CREATE_LESSON_WITH_AI)

	const [isLessonCreated, setIsLessonCreated] = useState(false)
	const [lessonIdCreated, setLessonIdCreated] = useState<string | null>(null)

	useEffect(() => {
		logger.log(1, lessonId)
		logger.log(2, !lessonContentData?.lessonBlocks.length)
		logger.log(3, !isLessonCreated)
		logger.log(4, !loadingLessonContent)
		if (
			lessonId &&
			!lessonContentData?.lessonBlocks.length &&
			!isLessonCreated &&
			!loadingLessonContent
		) {
			createLessonWithAI({
				variables: {
					input: {
						id: lessonId,
						courseAIHistoryId: courseAIHistory?.id,
						courseId: lessonContentData?.courseId,
						name: lessonContentData?.name,
						description: lessonContentData?.description,
						subtopicId: lessonContentData?.subtopicId
					}
				}
			})
				.then(({ data }) => {
					if (data?.createLessonWithAI) {
						setIsLessonCreated(true)
						setLessonIdCreated(data.createLessonWithAI.id)
					}
				})
				.catch(error => {
					console.error(error)
				})
		}
	}, [
		lessonId,
		createLessonWithAI,
		isLessonCreated,
		loadingLessonContent,
		courseAIHistory?.id,
		lessonContentData
	])
	if (loadingLessonContent || creatingLesson) {
		return (
			<DashboardLayout>
				<div className='mt-10 flex gap-4 flex-col items-center w-full justify-center'>
					<h1 className='text-lg text-accent'>
						{t('Lesson creation in progress')}
					</h1>
					<p className='text-sm text-secondary'>
						{t(
							'This will take a couple of minutes Please do not close the page'
						)}
					</p>
					<BigDotsLoader />
				</div>
			</DashboardLayout>
		)
	} else if (errorLessonContent || createLessonError) {
		return (
			<DashboardLayout>
				<div className='w-fill flex flex-col items-center justify-center mt-10'>
					<h1>{t('There was an error loading the lesson or creating it')}</h1>
					<Button
						onClick={() => window.location.reload()}
						size='3xl'
						color='main'
					>
						{t('Try again')}
					</Button>
				</div>
			</DashboardLayout>
		)
	}
	return (
		<DashboardLayout>
			<Lesson
				lessonId={lessonId}
				lessonContentData={lessonContentData}
				errorLessonContent={errorLessonContent}
				createLessonError={createLessonError}
				creatingLesson={creatingLesson}
			/>
		</DashboardLayout>
	)
}

export default LessonPage
