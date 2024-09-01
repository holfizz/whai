'use client'

import { useGetLessonContent } from '@/entities/lesson'
import { Lesson } from '@/features/lesson'
import { DashboardLayout } from '@/widgets/DashboardLayout'
import { useParams } from 'next/navigation'

const IndependentLessonPage = () => {
	const { lessonId } = useParams<{ lessonId: string }>()

	const { lessonContentData, errorLessonContent } =
		useGetLessonContent(lessonId)

	return (
		<DashboardLayout>
			<Lesson
				isIndependent
				lessonId={lessonId}
				lessonContentData={lessonContentData}
				errorLessonContent={errorLessonContent}
				createLessonError={null}
				creatingLesson={null}
			/>
		</DashboardLayout>
	)
}

export default IndependentLessonPage
