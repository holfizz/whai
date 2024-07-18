'use client'
import { gql, useQuery } from '@apollo/client'
import { ICourseWithAI } from '@/entities/chatWithAI/model/chatWithAI.types'

export const GET_ALL_CHATS_WITH_AI = gql`
	query GetAllChatsWithAI($lessonId: ID!) {
		getAllChatsWithAI(lessonId: $lessonId) {
			title
		}
	}
`
export const useGetAllChatsWithAI = (lessonId: string) => {
	const { data, error, loading } = useQuery<{
		getAllChatsWithAI: ICourseWithAI[]
	}>(GET_ALL_CHATS_WITH_AI, {
		variables: { lessonId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		getAllChatsWithAI: data?.getAllChatsWithAI,
		errorAllChatsWithAI: error,
		loadingAllChatsWithAI: loading
	}
}
