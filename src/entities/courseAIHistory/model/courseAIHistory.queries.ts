import { gql, useMutation } from '@apollo/client'

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
