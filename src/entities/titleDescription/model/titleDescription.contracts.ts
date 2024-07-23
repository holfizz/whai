'use client'
import { z } from 'zod'

export const titleDescriptionSchema = z.object({
	title: z.string(),
	description: z.string()
})
