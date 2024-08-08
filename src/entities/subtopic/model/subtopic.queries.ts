'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
import { ISubtopic } from '../model/subtopic.types'

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

export const GET_ALL_SUBTOPICS = gql`
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
		GET_ALL_SUBTOPICS,
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

export const UPDATE_SUBTOPIC = gql`
	mutation updateSubtopic($updateSubtopicInput: UpdateSubtopicInput!) {
		updateSubtopic(updateSubtopicInput: $updateSubtopicInput) {
			id
			name
			description
			progressPercents
			completionTime
		}
	}
`

export const useUpdateSubtopic = () => {
	const [updateSubtopic, { data, error, loading }] = useMutation<{
		updateSubtopic: ISubtopic
	}>(UPDATE_SUBTOPIC)
	return {
		updateSubtopic,
		dataSubtopicUpdate: data?.updateSubtopic,
		errorSubtopicUpdate: error,
		loadingSubtopicUpdate: loading
	}
}
