'use client'
import { ICourse } from '@/entities/course'
import { gql, useMutation, useQuery } from '@apollo/client'

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
			imgUrl
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
	mutation ($createCourseData: CourseInput!, $image: Upload) {
		createCourse(createCourseData: $createCourseData, image: $image) {
			id
		}
	}
`

export const useCreateCourse = () => {
	const [createCourse, { data, error, loading }] = useMutation<{
		createCourse: Pick<ICourse, 'id'>
	}>(CREATE_COURSE, {
		context: {
			headers: {
				'apollo-require-preflight': true
			}
		},

		fetchPolicy: 'no-cache'
	})

	return {
		createCourse,
		newCourseData: data?.createCourse,
		errorCreatingCourse: error,
		loadingCreatingCourse: loading
	}
}

export const UPDATE_COURSE = gql`
	mutation UpdateCourse(
		$id: ID!
		$updateCourseData: UpdateCourse!
		$image: Upload
	) {
		updateCourse(id: $id, updateCourseData: $updateCourseData, image: $image) {
			id
			name
			description
			imgUrl
		}
	}
`

export const useUpdateCourse = () => {
	const [updateCourse, { data, error, loading }] = useMutation<{
		updateCourse: Pick<ICourse, 'id' | 'name' | 'description' | 'imgUrl'>
	}>(UPDATE_COURSE, {
		context: {
			headers: {
				'apollo-require-preflight': true
			}
		},
		fetchPolicy: 'no-cache'
	})

	return {
		updateCourse,
		updatedCourse: data?.updateCourse,
		errorUpdatingCourse: error,
		loadingUpdatingCourse: loading
	}
}
