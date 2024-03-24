import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import { MessageWithAiType } from '../../../entities/MessageWithAI/model/message.types'

interface chatWithAIInput {
	input: {
		chatWithAIId: number
		text: string
	}
}
const CHAT_WITH_AI = gql`
	mutation CreateMessageWithAi($input: ChatWithAiRequestInput!) {
		createMessageWithAi(chatWithAIRequestDto: $input) {
			from
			text
		}
	}
`
export const useChatWithAIMutation = () => {
	const [chatWithAi, { data, error, loading }] = useMutation<
		{ createMessageWithAi: MessageWithAiType },
		chatWithAIInput
	>(CHAT_WITH_AI)
	return { chatWithAi, data: data?.createMessageWithAi, error, loading }
}

const GET_ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
	query getAllMessagesInChatWithAI($chatWithAIId: Float!) {
		getAllMessageInChatWithAI(chatWithAIId: $chatWithAIId) {
			text
			from
		}
	}
`
export const useGetAllMessagesInChatWithAIQuery = (chatWithAIId: number) => {
	const { data, error } = useQuery<
		{ getAllMessageInChatWithAI: MessageWithAiType[] },
		{ chatWithAIId: number }
	>(GET_ALL_MESSAGES_IN_CHAT_WITH_AI, {
		variables: { chatWithAIId },
	})
	return { data: data?.getAllMessageInChatWithAI, error }
}

const SUBSCRIPTION_TO_CHAT_WITH_AI = gql`
	subscription {
		messageWithAiCreate(chatWithAIId: 2) {
			text
			from
			id
		}
	}
`
export const useChatWithAISubscription = (chatWithAIId: number) => {
	const { data, error, loading } = useSubscription<
		{ messageWithAiCreate: MessageWithAiType[] },
		{ chatWithAIId: number }
	>(SUBSCRIPTION_TO_CHAT_WITH_AI, {
		variables: { chatWithAIId },
	})
	return { data: data?.messageWithAiCreate, error, loading }
}
