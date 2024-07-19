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

export const useGetAllMessagesInChatWithAI = ({
	chatId,
	initialSkip,
	initialTake
}: {
	chatId: string
	initialSkip: number
	initialTake: number
}) => {
	const { data, error, loading, fetchMore } = useQuery<{
		getAllMessageInChatWithAI: IMessageWithAI[]
	}>(GET__ALL_MESSAGES_IN_CHAT_WITH_AI, {
		variables: { chatId, skip: initialSkip, take: initialTake },
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
				chatId,
				skip: currentSkip,
				take: currentTake
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				console.log('Previous data:', prev)
				console.log('Fetched more data:', fetchMoreResult)
				if (!fetchMoreResult) return prev

				return {
					getAllMessageInChatWithAI: [
						...prev.getAllMessageInChatWithAI,
						...fetchMoreResult.getAllMessageInChatWithAI
					]
				}
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
