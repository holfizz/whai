import { gql, useMutation, useQuery } from '@apollo/client'
import { ICourseAIHistory } from './courseAiHistory.types'
export const CREATE_COURSE_AI_HISTORY = gql`
	mutation ($courseId: ID!) {
		createCourseAIHistory(courseId: $courseId) {
			id
		}
	}
`

export const useCreateCourseAIHistory = () => {
	const [createCourseAIHistory, { data, error, loading }] = useMutation<{
		createCourseAIHistory: { id: string }
	}>(CREATE_COURSE_AI_HISTORY, {
		fetchPolicy: 'no-cache'
	})

	return {
		createCourseAIHistory,
		historyData: data?.createCourseAIHistory,
		errorCreatingHistory: error,
		loadingCreatingHistory: loading
	}
}

const GET_COURSE_AI_HISTORY = gql`
	query ($courseId: ID!) {
		getCourseAIHistoryByCourseId(courseId: $courseId) {
			id
		}
	}
`

export const useGetCourseAIHistoryByCourseId = (courseId: string) => {
	const { data, error, loading } = useQuery<{
		getCourseAIHistoryByCourseId: ICourseAIHistory
	}>(GET_COURSE_AI_HISTORY, {
		variables: { courseId },
		fetchPolicy: 'no-cache'
	})

	return {
		courseAIHistory: data?.getCourseAIHistoryByCourseId,
		errorFetchingHistory: error,
		loadingFetchingHistory: loading
	}
}
