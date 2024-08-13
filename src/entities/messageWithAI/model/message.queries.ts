import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import { IMessageWithAI } from './message.types'

export const GET_ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
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
	const { data, error, loading, fetchMore, refetch } = useQuery<{
		getAllMessageInChatWithAI: IMessageWithAI[]
	}>(GET_ALL_MESSAGES_IN_CHAT_WITH_AI, {
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
				if (!fetchMoreResult) return prev
				const newMessages = fetchMoreResult.getAllMessageInChatWithAI
				console.log(newMessages)
				if (newMessages.length === 0) {
					return prev
				}

				return {
					getAllMessageInChatWithAI: [
						...prev.getAllMessageInChatWithAI,
						...newMessages
					]
				}
			}
		})
	}

	return {
		messagesAllMessagesInChatWithAI: data?.getAllMessageInChatWithAI || [],
		errorAllMessagesInChatWithAI: error,
		loadingAllMessagesInChatWithAI: loading,
		loadMore,
		refetch
	}
}

const CHAT_WITH_AI_ANSWER_SUBSCRIPTION = gql`
	subscription chatWithAIAnswer($chatWithAIId: String!) {
		chatWithAIAnswer(chatWithAIId: $chatWithAIId) {
			message {
				content
				role
				type
			}
			is_finish
			conversation_id
		}
	}
`

export const useChatWithAIAnswerSubscription = (chatWithAIId: string) => {
	const { data, error, loading } = useSubscription<{
		chatWithAIAnswer: {
			message: {
				content: string
				role: string
				type: string
			}
			is_finish: boolean
			conversation_id: string
		}
	}>(CHAT_WITH_AI_ANSWER_SUBSCRIPTION, {
		variables: { chatWithAIId }
	})

	return {
		subscriptionChatWithAIData: data?.chatWithAIAnswer,
		subscriptionChatWithAIError: error,
		subscriptionChatWithAILoading: loading
	}
}

const CREATE_MESSAGE_WITH_AI_MUTATION = gql`
	mutation createMessageWithAI($chatWithAIRequestDto: MessageWithAIInput!) {
		createMessageWithAI(chatWithAIRequestDto: $chatWithAIRequestDto) {
			content
			role
			type
		}
	}
`
export const useCreateMessageWithAI = () => {
	const [createMessageWithAI, { data, error, loading }] = useMutation<{
		createMessageWithAI: IMessageWithAI
	}>(CREATE_MESSAGE_WITH_AI_MUTATION, {})

	return {
		createMessageWithAI,
		createMessageWithAIData: data?.createMessageWithAI,
		createMessageWithAIError: error,
		createMessageWithAILoading: loading
	}
}
