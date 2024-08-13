'use client'
import { ILesson, ILessonContent } from '@/entities/lesson/model/lesson.types'
import { gql, useMutation, useQuery } from '@apollo/client'

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

export const GET_LESSON_NAME = gql`
	query ($lessonId: ID!) {
		getLesson(lessonId: $lessonId) {
			name
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
			isHasLessonTask
			name
			subtopicId
			isCompleted
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
			courseId
			subtopicId
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

export const CREATE_LESSON_WITH_AI = gql`
	mutation CreateLessonWithAI($input: LessonWithAIInput!) {
		createLessonWithAI(createLessonWithAIInput: $input) {
			id
			name
			description
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

export const UPDATE_LESSON = gql`
	mutation updateLesson($updateLessonInput: UpdateLesson!) {
		updateLesson(updateLessonInput: $updateLessonInput) {
			id
			name
			description
		}
	}
`
export const useUpdateLesson = () => {
	const [updateLesson, { data, error, loading }] = useMutation<{
		updateLesson: Pick<ILesson, 'name' | 'description' | 'id'>
	}>(UPDATE_LESSON, {})
	return {
		updateLesson,
		dataLessonUpdate: data?.updateLesson,
		errorLessonUpdate: error,
		loadingLessonUpdate: loading
	}
}

export const GET_ALL_INDEPENDENT_LESSONS = gql`
	query ($subtopicId: ID!) {
		getAllLessons(subtopicId: $subtopicId) {
			id
			isHasLessonTask
			name
			subtopicId
			isCompleted
			lessonTasks {
				isChecked
				name
			}
		}
	}
`
export const useGetAllIndependentLesson = () => {
	const { data, error, loading } = useQuery<{ getAllLessons: ILesson[] }>(
		GET_ALL_INDEPENDENT_LESSONS,
		{
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		lessonsAllData: data?.getAllLessons,
		errorLessonsAll: error,
		loadingLessonsAll: loading
	}
}
