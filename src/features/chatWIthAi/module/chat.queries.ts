import { gql, useMutation, useQuery } from '@apollo/client'
import { MessageWithAiType } from './message.types'

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
	const [chatWithAi, { data, error }] = useMutation<
		{ createMessageWithAi: MessageWithAiType },
		chatWithAIInput
	>(CHAT_WITH_AI)
	return { chatWithAi, data: data?.createMessageWithAi, error }
}

const GET_ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
	query getAllMessagesInChatWithAI($chatWithAIId: Int!) {
		getAllMessageInChatWithAI(chatWithAIId: $chatWithAIId) {
			text
			from
		}
	}
`
export const useGetAllMessagesInChatWithAIQuery = () => {
	const [getAllMessages, { data, error }] = useQuery<
		{ createMessageWithAi: MessageWithAiType },
		chatWithAIInput
	>(GET_ALL_MESSAGES_IN_CHAT_WITH_AI)
	return { chatWithAi, data: data?.createMessageWithAi, error }
}
