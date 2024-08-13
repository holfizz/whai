'use client'

import { useGetAllCourses } from '@/entities/course'
import CourseCard from '@/shared/ui/CourseCard/CourseCard'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'

const CourseSection = () => {
	const { allCourseData, loadingAllCourse, errorAllCourse } = useGetAllCourses()

	return (
		<>
			<div>
				{errorAllCourse && <p>Error loading courses</p>}
				{loadingAllCourse && <DotsLoader />}
			</div>
			{allCourseData &&
				allCourseData.map((course, i) => (
					<CourseCard isSquare course={course} key={i} />
				))}
		</>
	)
}

export default CourseSection
