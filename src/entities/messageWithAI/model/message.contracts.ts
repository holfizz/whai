'use client'
import { z } from 'zod'

export enum MessageWithAIFrom {
	AI = 'AI',
	USER = 'USER'
}
export const MessageWithAISchema = z.object({
	id: z.number().int(),
	text: z.string().max(4096),
	file: z.instanceof(File).optional().nullable(),
	type: z.string().default('text').optional(),
	from: z.nativeEnum(MessageWithAIFrom)
})
