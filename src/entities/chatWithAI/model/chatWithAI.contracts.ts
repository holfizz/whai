'use client'
import { z } from 'zod'

export const MessageWithAISchema = z.object({
	title: z.string()
})
