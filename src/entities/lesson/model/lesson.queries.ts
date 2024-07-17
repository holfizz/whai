'use client'
import { gql, useQuery } from '@apollo/client'
import { ILesson, ILessonContent } from '@/entities/lesson/model/lesson.types'

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
		lessonData: data?.getLesson,
		errorLesson: error,
		loadingLesson: loading
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
		errorLessonsAll: error,
		loadingLessonsAll: loading
	}
}

//==================//
export const GET_LESSON_CONTENT = gql`
	query ($lessonId: ID!) {
		getLesson(lessonId: $lessonId) {
			id
			name
			description
			isHasLessonTask
			lessonTasks {
				isChecked
				lessonId
				name
			}
			lessonBlocks {
				id
				type
				text
				videoUrl
				imageUrl
				code
				createdAt
			}
		}
	}
`
export const useGetLessonContent = (lessonId: string) => {
	const { data, error, loading } = useQuery<{ getLesson: ILessonContent }>(
		GET_LESSON_CONTENT,
		{
			variables: { lessonId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		lessonContentData: data?.getLesson,
		errorLessonContent: error,
		loadingLessonContent: loading
	}
}
