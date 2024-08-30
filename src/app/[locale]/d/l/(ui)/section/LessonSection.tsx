'use client'

import { getAllIndependentLessons } from '@/entities/lesson'

const LessonSection = () => {
	const { lessonsAllData, loadingAllLesson, errorAllLesson } =
		getAllIndependentLessons()

	if (loadingAllLesson) return <p>Loading...</p>
	if (errorAllLesson) return <p>Error loading lessons</p>

	return (
		<>
			{lessonsAllData &&
				lessonsAllData.map((lesson, i) => <div key={i}>{lesson.name}</div>)}
		</>
	)
}

export default LessonSection
