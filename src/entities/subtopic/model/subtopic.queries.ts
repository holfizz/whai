'use client'
import { gql, useQuery } from '@apollo/client'
import { ISubtopic } from '@/entities/subtopic/model/subtopic.types'

export const GET_SUBTOPIC = gql`
	query ($subtopicId: ID!) {
		getSubtopic(subtopicId: $subtopicId) {
			id
			name
			description
			progressPercents
		}
	}
`
export const useGetSubtopic = (subtopicId: string) => {
	const { data, error, loading } = useQuery<{ getSubtopic: ISubtopic }>(
		GET_SUBTOPIC,
		{
			variables: { subtopicId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		subtopicData: data?.getSubtopic,
		errorSubtopic: error,
		loadingSubtopic: loading
	}
}

export const GET_ALL_SUBTOPIC = gql`
	query ($topicId: ID!) {
		getAllSubtopics(topicId: $topicId) {
			id
			name
			description
			completionTime
			progressPercents
		}
	}
`
export const useGetAllSubtopics = (topicId: string) => {
	const { data, error, loading } = useQuery<{ getAllSubtopics: ISubtopic[] }>(
		GET_ALL_SUBTOPIC,
		{
			variables: { topicId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		subtopicsAllData: data?.getAllSubtopics,
		errorSubtopicAll: error,
		loadingSubtopicAll: loading
	}
}
