'use client'
import { IChatWithAI } from '@/entities/chatWithAI/model/chatWithAI.types'
import { gql, useMutation, useQuery } from '@apollo/client'

export const GET_ALL_CHATS_WITH_AI = gql`
	query GetAllChatsWithAI($lessonId: ID!) {
		getAllChatsWithAI(lessonId: $lessonId) {
			id
			title
		}
	}
`
export const useGetAllChatsWithAI = (lessonId: string) => {
	const { data, error, loading } = useQuery<{
		getAllChatsWithAI: IChatWithAI[]
	}>(GET_ALL_CHATS_WITH_AI, {
		variables: { lessonId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		getAllChatsWithAI: data?.getAllChatsWithAI,
		errorAllChatsWithAI: error,
		loadingAllChatsWithAI: loading,
		hasFetched: !loading && data !== undefined
	}
}

export const CREATE_CHAT_WITH_AI = gql`
	mutation CreateChatWithAI($createChatInput: ChatWithAIInput!) {
		createChatWithAI(createChatInput: $createChatInput) {
			id
			title
		}
	}
`
export const useCreateChatWithAI = () => {
	const [mutationCreateChatWithAI, { data, error, loading }] = useMutation<{
		createChatWithAI: IChatWithAI
	}>(CREATE_CHAT_WITH_AI, {})
	return {
		mutationCreateChatWithAI,
		createChatsWithAIData: data?.createChatWithAI,
		errorCreateChatsWithAI: error,
		loadingCreateChatsWithAI: loading
	}
}
