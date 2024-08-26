'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useGetLessonContent } from '@/entities/lesson'
import { Lesson } from '@/features/lesson'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_LESSON_WITH_AI } from '@/entities/lesson/model/lesson.queries'

const LessonPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()

	// Fetch lesson content and course AI history
	const { lessonContentData, errorLessonContent, loadingLessonContent } =
		useGetLessonContent(lessonId)
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(
		lessonContentData?.courseId
	)

	// Mutation for creating lesson with AI
	const [
		createLessonWithAI,
		{ loading: creatingLesson, error: createLessonError }
	] = useMutation(CREATE_LESSON_WITH_AI)
	const [isLessonCreated, setIsLessonCreated] = useState(false)
	const [lessonIdCreated, setLessonIdCreated] = useState<string | null>(null)

	useEffect(() => {
		if (lessonId && !isLessonCreated && !loadingLessonContent) {
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
