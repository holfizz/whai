import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
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
			id
		}
	}
`
export const useCreateCoursePlanWithAI = () => {
	const [createCoursePlanWithAI, { data, error, loading }] = useMutation<{
		createPlanWithAI: Pick<ICoursePlanWithAI, 'id'>
	}>(CREATE_COURSE_PLAN_WITH_AI_MUTATION, {})

	return {
		createCoursePlanWithAI,
		createPlanData: data?.createPlanWithAI,
		createPlanError: error,
		createPlanLoading: loading
	}
}

const GET_COURSE_PLAN = gql`
	query getCoursePlan($planId: ID!) {
		getCoursePlan(planId: $planId) {
			id
			name
			description
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

					completionTime
				}
				completionTime
			}
		}
	}
`
export const useGetPlanId = () => {
	const [getCoursePlan, { data, error, loading }] = useLazyQuery<{
		getCoursePlan: ICoursePlanWithAI
	}>(GET_COURSE_PLAN)
	return {
		getCoursePlan,
		coursePlanData: data?.getCoursePlan,
		coursePlanError: error,
		coursePlanLoading: loading
	}
}
const UPDATE_COURSE_PLAN_WITH_AI_MUTATION = gql`
	mutation updatePlan($planId: ID!, $updatePlanInput: CoursePlanInput!) {
		updatePlan(planId: $planId, updatePlanInput: $updatePlanInput) {
			id
			name
			description
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
						subtopicId
						courseId
					}
				}
			}
		}
	}
`

export const useUpdateCoursePlanWithAI = () => {
	const [updateCoursePlanWithAI, { data, error, loading }] = useMutation<{
		updateCoursePlanWithAI: ICoursePlanWithAI
	}>(UPDATE_COURSE_PLAN_WITH_AI_MUTATION, {
		update(cache, { data }) {
			if (data?.updateCoursePlanWithAI) {
				const updatedPlan = data.updateCoursePlanWithAI
				const { getAllCoursePlansWithAI } = cache.readQuery({
					query: GET_ALL_COURSE_PLANS_WITH_AI
				}) as { getAllCoursePlansWithAI: ICoursePlanWithAI[] }

				const updatedPlans = getAllCoursePlansWithAI.map(plan =>
					plan.id === updatedPlan.id ? updatedPlan : plan
				)

				cache.writeQuery({
					query: GET_ALL_COURSE_PLANS_WITH_AI,
					data: { getAllCoursePlansWithAI: updatedPlans }
				})
			}
		}
	})

	return {
		updateCoursePlanWithAI,
		updatedPlanData: data?.updateCoursePlanWithAI,
		updatePlanError: error,
		updatePlanLoading: loading
	}
}
