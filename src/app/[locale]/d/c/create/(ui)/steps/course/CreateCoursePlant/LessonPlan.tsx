import { useUpdateLesson } from '@/entities/lesson'
import { useEffect, useState } from 'react'
import CreateCourseCard from './CreateCourseCard/CreateCourseCard'

const LessonPlan = ({ lessonsAllData, t }) => {
	const [lessons, setLessons] = useState(lessonsAllData)
	const {
		updateLesson,
		dataLessonUpdate,
		loadingLessonUpdate,
		errorLessonUpdate
	} = useUpdateLesson()

	const handleLessonDataChange = updatedLesson => {
		updateLesson({
			variables: {
				updateLessonInput: {
					id: updatedLesson.id,
					name: updatedLesson.name,
					description: updatedLesson.description
				}
			}
		})
	}

	useEffect(() => {
		if (dataLessonUpdate) {
			setLessons(prevLessons =>
				prevLessons.map(lesson =>
					lesson.id === dataLessonUpdate.id ? dataLessonUpdate : lesson
				)
			)
		}
	}, [dataLessonUpdate])

	return (
		<>
			{lessons.map(lesson => (
				<CreateCourseCard
					t={t}
					type='lesson'
					key={lesson.id}
					data={lesson}
					buttonText={t('Generate lesson')}
					onCourseDataChange={handleLessonDataChange}
				/>
			))}
		</>
	)
}

export default LessonPlan
