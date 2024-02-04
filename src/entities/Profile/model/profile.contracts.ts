import { z } from 'zod'

export const ProfileData = z.object({
	user: z.object({
		id: z.number(),
		email: z.string(),
		isAdmin: z.boolean(),
		isActivated: z.boolean(),
		activationLink: z.string(),
	}),
	accessToken: z.string(),
	refreshToken: z.string(),
})
export const ProfileState = z.object({
	email: z.string(),
	password: z.string().optional(),
})
