'use client'

import { useGetCourseAIHistoryByCourseId } from '@/entities/courseAIHistory'
import { useGetLessonContent } from '@/entities/lesson'
import { Lesson } from '@/features/lesson'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useParams } from 'next/navigation'

const IndependentLessonPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()

	const { lessonContentData, errorLessonContent, loadingLessonContent } =
		useGetLessonContent(lessonId)
	const { courseAIHistory } = useGetCourseAIHistoryByCourseId(
		lessonContentData?.courseId
	)

	// Mutation for creating lesson with AI

	return (
		<DashboardLayout>
			<Lesson
				isIndependent
				lessonId={lessonId}
				lessonContentData={lessonContentData}
				courseAIHistoryId={courseAIHistory?.id}
				loadingLessonContent={loadingLessonContent}
				errorLessonContent={errorLessonContent}
				createLessonError={null}
				creatingLesson={null}
			/>
		</DashboardLayout>
	)
}

export default IndependentLessonPage
