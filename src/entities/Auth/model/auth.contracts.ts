import { z } from 'zod'

export const ProfileData = z.object({
	user: z.object({
		email: z.string(),
		firstName: z.string(),
		lastName: z.string(),
		phoneNumber: z.string(),
		avatarPath: z.string(),
	}),
	accessToken: z.string(),
	refreshToken: z.string(),
})
export const ProfileState = z.object({
	email: z.string(),
	password: z.string(),
})
