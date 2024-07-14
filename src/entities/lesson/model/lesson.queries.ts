'use client'
import { gql, useQuery } from '@apollo/client'
import { ILesson } from '@/entities/lesson/model/lesson.types'

export const GET_LESSON = gql`
	query ($lessonId: ID!) {
		getLesson(lessonId: $lessonId) {
			id
			name
			subtopicId
			isCompleted
			isHasLessonTask
			lessonTasks {
				isChecked
				name
			}
		}
	}
`
export const useGetLesson = (lessonId: string) => {
	const { data, error, loading } = useQuery<{ getLesson: ILesson }>(
		GET_LESSON,
		{
			variables: { lessonId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		lessonsAllData: data?.getLesson,
		errorLessonAll: error,
		loadingLessonAll: loading
	}
}

export const GET_ALL_LESSONS = gql`
	query ($subtopicId: ID!) {
		getAllLessons(subtopicId: $subtopicId) {
			id
			name
			subtopicId
			isCompleted
			isHasLessonTask
			lessonTasks {
				isChecked
				name
			}
		}
	}
`
export const useGetAllLessons = (subtopicId: string) => {
	const { data, error, loading } = useQuery<{ getAllLessons: ILesson[] }>(
		GET_ALL_LESSONS,
		{
			variables: { subtopicId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		lessonsAllData: data?.getAllLessons,
		errorLessonAll: error,
		loadingLessonAll: loading
	}
}
