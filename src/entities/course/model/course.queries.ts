'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
import { ICourse } from '@/entities/course'

export const GET_LAST_COURSE = gql`
	query {
		getLastCourse {
			name
			id
			totalTopics
			completionTime
			progressPercents
		}
	}
`
export const useGetLastCourse = () => {
	const { data, error, loading } = useQuery<{ getLastCourse: ICourse }>(
		GET_LAST_COURSE,
		{
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		lastCourseData: data?.getLastCourse,
		errorLastCourse: error,
		loadingLastCourse: loading
	}
}

export const GET_ALL_COURSES = gql`
	query {
		getAllCourses {
			id
			name
			totalTopics
			completionTime
			progressPercents
		}
	}
`
export const useGetAllCourses = () => {
	const { data, error, loading } = useQuery<{ getAllCourses: ICourse[] }>(
		GET_ALL_COURSES,
		{
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		allCourseData: data?.getAllCourses,
		errorAllCourse: error,
		loadingAllCourse: loading
	}
}

export const GET_COURSE = gql`
	query ($courseId: ID!) {
		getCourse(courseId: $courseId) {
			name
		}
	}
`
export const useGetCourse = (courseId: string) => {
	const { data, error, loading } = useQuery<{ getCourse: ICourse }>(
		GET_COURSE,
		{
			variables: { courseId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		courseData: data?.getCourse,
		errorCourse: error,
		loadingCourse: loading
	}
}
export const CREATE_COURSE = gql`
	mutation ($createCourseData: CourseInput!) {
		createCourse(createCourseData: $createCourseData) {
			id
		}
	}
`

export const useCreateCourse = () => {
	const [createCourse, { data, error, loading }] = useMutation<{
		createCourse: Pick<ICourse, 'id'>
	}>(CREATE_COURSE, {
		fetchPolicy: 'no-cache',
		variables: { createCourseData: {} }
	})

	return {
		createCourse,
		newCourseData: data?.createCourse,
		errorCreatingCourse: error,
		loadingCreatingCourse: loading
	}
}
