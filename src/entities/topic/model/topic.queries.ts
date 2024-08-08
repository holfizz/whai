'use client'
import type { ITopic } from '@/entities/topic/model/topic.types'
import { gql, useMutation, useQuery } from '@apollo/client'

export const GET_TOPIC = gql`
	query ($topicId: ID!) {
		getTopic(topicId: $topicId) {
			id
			name
			description
			isHasVideo
			totalSubtopics
			completionTime
			progressPercents
		}
	}
`
export const useGetTopic = (topicId: string) => {
	const { data, error, loading } = useQuery<{ getTopic: ITopic }>(GET_TOPIC, {
		variables: { topicId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		topicData: data?.getTopic,
		errorTopic: error,
		loadingTopic: loading
	}
}

export const GET_ALL_TOPIC = gql`
	query ($courseId: ID!) {
		getAllTopics(courseId: $courseId) {
			id
			name
			isHasVideo
			description
			completionTime
			totalSubtopics
			progressPercents
		}
	}
`
export const useGetAllTopics = (courseId: string) => {
	const { data, error, loading } = useQuery<{ getAllTopics: ITopic[] }>(
		GET_ALL_TOPIC,
		{
			variables: { courseId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		topicsAllData: data?.getAllTopics,
		errorTopicAll: error,
		loadingTopicAll: loading
	}
}
export const UPDATE_TOPIC = gql`
	mutation ($topicId: ID!, $updateTopicInput: UpdateTopicInput!) {
		updateTopic(topicId: $topicId, updateTopicInput: $updateTopicInput) {
			id
			name
			description
		}
	}
`

export const useUpdateTopic = () => {
	const [updateTopic, { data, error, loading }] = useMutation<{
		updateTopic: ITopic
	}>(UPDATE_TOPIC)
	return {
		updateTopic,
		updatedTopicData: data?.updateTopic,
		errorUpdateTopic: error,
		loadingUpdateTopic: loading
	}
}
