'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useGetLessonContent } from '@/entities/lesson'
import { CREATE_LESSON_WITH_AI } from '@/entities/lesson/model/lesson.queries'
import { Lesson } from '@/features/lesson'
import logger from '@/shared/lib/utils/logger'
import BigDotsLoader from '@/shared/ui/Loader/BigDotsLoader'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useMutation } from '@apollo/client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const LessonPage = () => {
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
			<DashboardLayout className='w-full'>
				<div className='w-full flex items-center justify-center h-[100vh]'>
					<BigDotsLoader />
				</div>
			</DashboardLayout>
		)
	}

	if (errorLessonContent || createLessonError) {
		return (
			<DashboardLayout>
				Error: {errorLessonContent?.message || createLessonError?.message}
			</DashboardLayout>
		)
	}

	return (
		<DashboardLayout>
			<Lesson
				lessonId={lessonId}
				lessonContentData={lessonContentData}
				courseAIHistoryId={courseAIHistory?.id}
				loadingLessonContent={loadingLessonContent}
				errorLessonContent={errorLessonContent}
				createLessonError={createLessonError}
				creatingLesson={creatingLesson}
			/>
		</DashboardLayout>
	)
}

export default LessonPage
