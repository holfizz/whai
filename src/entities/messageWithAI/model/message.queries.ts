import { gql, useQuery } from '@apollo/client'
import { IMessageWithAI } from './message.types'

export const GET__ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
	query GetAllMessagesInChatWithAI($chatId: ID!, $skip: Int, $take: Int) {
		getAllMessageInChatWithAI(
			dto: { chatId: $chatId, skip: $skip, take: $take }
		) {
			content
			role
		}
	}
`

export const useGetAllMessagesInChatWithAI = (
	chatId: string,
	skip: number,
	take: number
) => {
	const { data, error, loading, fetchMore } = useQuery<{
		getAllMessageInChatWithAI: IMessageWithAI[]
	}>(GET__ALL_MESSAGES_IN_CHAT_WITH_AI, {
		variables: { chatId, skip, take },
		fetchPolicy: 'cache-and-network'
	})

	const loadMore = () => {
		fetchMore({
			variables: {
				skip: skip + take
			}
		})
	}

	return {
		messagesAllMessagesInChatWithAI: data?.getAllMessageInChatWithAI || [],
		errorAllMessagesInChatWithAI: error,
		loadingAllMessagesInChatWithAI: loading,
		loadMore
	}
}
