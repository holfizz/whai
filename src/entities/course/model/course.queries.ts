'use client'
import { gql, useQuery } from '@apollo/client'
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
			name
			id
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
