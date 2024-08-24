'use client'
import { IChatWithAI } from '@/entities/chatWithAI/model/chatWithAI.types'
import { gql, useQuery } from '@apollo/client'

export const GET_ALL_CHATS_WITH_AI = gql`
	query GetAllChatsWithAI($lessonId: ID!) {
		getAllChatsWithAI(lessonId: $lessonId) {
			id
			title
		}
	}
`
export const useGetAllChatsWithAI = (lessonId: string) => {
	const { data, error, loading, refetch } = useQuery<{
		getAllChatsWithAI: IChatWithAI[]
	}>(GET_ALL_CHATS_WITH_AI, {
		variables: { lessonId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		getAllChatsWithAI: data?.getAllChatsWithAI,
		errorAllChatsWithAI: error,
		loadingAllChatsWithAI: loading,
		hasFetched: !loading && data !== undefined,
		refetch
	}
}
