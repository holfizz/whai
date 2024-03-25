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

interface GetAllMessagesInterface {
	dto: {
		chatId: number
		perPage?: string
		page?: string
	}
}

const GET_ALL_MESSAGES_IN_CHAT_WITH_AI = gql`
	query ($dto: GetAllMessagesInput!) {
		getAllMessageInChatWithAI(dto: $dto) {
			text
			id
			from
		}
	}
`
export const useGetAllMessagesInChatWithAIQuery = (
	chatId: number,
	page?: string,
	perPage?: string,
) => {
	const { data, error } = useQuery<
		{ getAllMessageInChatWithAI: MessageWithAiType[] },
		GetAllMessagesInterface
	>(GET_ALL_MESSAGES_IN_CHAT_WITH_AI, {
		variables: {
			dto: {
				chatId,
				perPage,
				page,
			},
		},
	})
	return { data: data?.getAllMessageInChatWithAI, error }
}

const SUBSCRIPTION_TO_CHAT_WITH_AI = gql`
	subscription ($chatWithAIId: Int!) {
		messageWithAiCreate(chatWithAIId: $chatWithAIId) {
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
