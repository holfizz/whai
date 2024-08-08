import { gql, useMutation, useQuery } from '@apollo/client'
import { ICoursePlanWithAI } from './plan.types'
export const GET_ALL_COURSE_PLANS_WITH_AI = gql`
	query GetAllCoursePlansWithAI($skip: Int, $take: Int) {
		getAllCoursePlansWithAI(dto: { skip: $skip, take: $take }) {
			name
			description
			additionalParams
			courseAIHistoryId
			courseId
			userKnowledge
			isHasVideo
			topics {
				name
				description
				courseId
				subtopics {
					name
					description
					topicId
					lessons {
						name
						description
						types
						subtopicId
						courseId
					}
					quizzes {
						name
						description
						subtopicId
						courseId
						isPlan
					}
					completionTime
				}
				completionTime
			}
		}
	}
`

export const useGetAllCoursePlansWithAI = ({
	initialSkip,
	initialTake
}: {
	initialSkip: number
	initialTake: number
}) => {
	const { data, error, loading, fetchMore } = useQuery<{
		getAllCoursePlansWithAI: ICoursePlanWithAI[]
	}>(GET_ALL_COURSE_PLANS_WITH_AI, {
		variables: { skip: initialSkip, take: initialTake },
		fetchPolicy: 'cache-and-network'
	})

	const loadMore = ({
		currentSkip,
		currentTake
	}: {
		currentSkip: number
		currentTake: number
	}) => {
		return fetchMore({
			variables: {
				skip: currentSkip,
				take: currentTake
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				const newCoursePlans = fetchMoreResult.getAllCoursePlansWithAI
				console.log(newCoursePlans)
				if (newCoursePlans.length === 0) {
					return prev
				}

				return {
					getAllCoursePlansWithAI: [
						...prev.getAllCoursePlansWithAI,
						...newCoursePlans
					]
				}
			}
		})
	}

	return {
		coursePlansWithAI: data?.getAllCoursePlansWithAI || [],
		errorCoursePlansWithAI: error,
		loadingCoursePlansWithAI: loading,
		loadMore
	}
}

const CREATE_COURSE_PLAN_WITH_AI_MUTATION = gql`
	mutation createPlanWithAI($CoursePlanWithAIInput: CoursePlanWithAIInput!) {
		createPlanWithAI(CoursePlanWithAIInput: $CoursePlanWithAIInput) {
			name
			description
			id
			topics {
				id
				name
				description
				courseId
				subtopics {
					id
					name
					description
					topicId
					lessons {
						id
						name
						description
						types
						subtopicId
						courseId
					}
					quizzes {
						name
						description
						subtopicId
						courseId
						isPlan
					}
					completionTime
				}
				completionTime
			}
		}
	}
`
export const useCreateCoursePlanWithAI = () => {
	const [createCoursePlanWithAI, { data, error, loading }] = useMutation<{
		createPlanWithAI: ICoursePlanWithAI
	}>(CREATE_COURSE_PLAN_WITH_AI_MUTATION, {})

	return {
		createCoursePlanWithAI,
		createPlanData: data?.createPlanWithAI,
		createPlanError: error,
		createPlanLoading: loading
	}
}
