import { z } from 'zod'
import { MessageWithAIRole, MessageWithAISchema } from './message.contracts'

export interface IMessageWithAI {
	content: string
	role: MessageWithAIRole
}
export type MessageWithAiType = z.infer<typeof MessageWithAISchema>
