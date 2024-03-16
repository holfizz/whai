import { z } from 'zod'

export const settingsFormSchema = z.object({
	email: z.string().email('Email is not correct'),
	firstName: z
		.string()
		.min(2, { message: 'First name must be at least 2 characters' }),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be at least 2 characters' }),
	avatarPath: z.string().optional().nullable(),
	phoneNumber: z
		.string()
		.min(10, { message: 'Phone number must be at least 10 characters' }),
})
