'use client'

import { useGetAllCourses } from '@/entities/course'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import { ENGLISH_COURSE_A1_TO_B1 } from '../../../(model)/static-course.data'

const CourseSection = () => {
	const { allCourseData, loadingAllCourse, errorAllCourse } = useGetAllCourses()

	return (
		<>
			{errorAllCourse && <p>Error loading courses</p>}
			{loadingAllCourse && <DotsLoader />}
			{allCourseData &&
				[...allCourseData, ENGLISH_COURSE_A1_TO_B1].map((course, i) => (
					<CourseCard isSquare course={course as any} key={i} />
				))}
		</>
	)
}

export default CourseSection
