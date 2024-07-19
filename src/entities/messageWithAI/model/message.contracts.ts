'use client'
import { z } from 'zod'

export enum MessageWithAIRole {
	ASSISTANT = 'ASSISTANT',
	USER = 'USER'
}
export const MessageWithAISchema = z.object({
	content: z.string(),
	role: z.enum([MessageWithAIRole.ASSISTANT, MessageWithAIRole.USER])
})
