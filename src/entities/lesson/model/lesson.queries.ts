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

export const GET_INDEPENDENT_LESSONS = gql`
	query {
		getAllIndependentLessons {
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

export const getAllIndependentLessons = () => {
	const { data, error, loading } = useQuery<{
		getAllIndependentLessons: ILesson[]
	}>(GET_INDEPENDENT_LESSONS, {
		fetchPolicy: 'cache-and-network'
	})
	return {
		lessonsAllData: data?.getAllIndependentLessons,
		errorAllLesson: error,
		loadingAllLesson: loading
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

export const GET_LESSON_TASKS = gql`
	query ($lessonId: ID!) {
		getLesson(lessonId: $lessonId) {
			lessonTasks {
				id
				isChecked
				name
				description
			}
		}
	}
`
export const useGetLessonTasks = (lessonId: string) => {
	const { data, error, loading } = useQuery<{ getLesson: ILesson }>(
		GET_LESSON_TASKS,
		{
			variables: { lessonId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		taskData: data?.getLesson,
		errorTask: error,
		loadingTask: loading
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
				description
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
			isCompleted
		}
	}
`
export const useUpdateLesson = () => {
	const [updateLesson, { data, error, loading }] = useMutation<{
		updateLesson: ILesson
	}>(UPDATE_LESSON, {})
	return {
		updateLesson,
		dataLessonUpdate: data?.updateLesson,
		errorLessonUpdate: error,
		loadingLessonUpdate: loading
	}
}

export const UPDATE_LESSON_COMPLETED = gql`
	mutation updateLesson($updateLessonInput: UpdateLesson!) {
		updateLesson(updateLessonInput: $updateLessonInput) {
			id
			isCompleted
		}
	}
`
export const useUpdateLessonCompleted = () => {
	const [updateLesson, { data, error, loading }] = useMutation<{
		updateLesson: ILesson
	}>(UPDATE_LESSON_COMPLETED, {})
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
export const CREATE_INDEPENDENT_LESSON_WITH_AI = gql`
	mutation CreateIndependentLessonWithAI($dto: LessonIndependentWithAIInput!) {
		createIndependentLessonWithAI(dto: $dto) {
			id
			name
			description
			lessonBlocks {
				id
				type
				imageUrl
				videoUrl
				lessonId
				caption
				code
				text
			}
			lessonTasks {
				id
				name
				isChecked
			}
		}
	}
`
export const useCreateIndependentLessonWithAI = () => {
	const [createLesson, { data, error, loading }] = useMutation<{
		createIndependentLessonWithAI: ILessonContent
	}>(CREATE_INDEPENDENT_LESSON_WITH_AI, { fetchPolicy: 'no-cache' })

	return {
		createLesson,
		dataCreateLesson: data?.createIndependentLessonWithAI,
		errorCreateLesson: error,
		loadingCreateLesson: loading
	}
}

export const GET_PREV_NEXT_LESSON = gql`
	query GetPrevNextLesson($courseId: ID!, $lessonId: ID!) {
		getPrevNextLesson(courseId: $courseId, lessonId: $lessonId) {
			prevLessonId
			nextLessonId
		}
	}
`

export const GET_BREADCRUMBS = gql`
	query getBreadcrumbsToLesson(
		$courseId: ID!
		$topicId: ID!
		$subtopicId: ID!
		$lessonId: ID!
	) {
		getBreadcrumbsToLesson(
			courseId: $courseId
			topicId: $topicId
			subtopicId: $subtopicId
			lessonId: $lessonId
		) {
			courseName
			topicName
			subtopicName
			lessonName
		}
	}
`
export const CHECK_HOMEWORK = gql`
	mutation CheckHomework($checkHomeworkDto: CheckHomeworkDto!, $file: Upload) {
		checkHomework(checkHomeworkDto: $checkHomeworkDto, file: $file) {
			status
			reason
			incorrectParts
			completionPercentage
			suggestions
			links
		}
	}
`
