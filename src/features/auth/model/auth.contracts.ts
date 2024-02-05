'use client'
import { z } from 'zod'

export const formSchema = z.object({
	email: z.string().email('Email is not correct'),
	password: z
		.string()
		.min(6, { message: 'The password must be at least 6 characters' }),
})
