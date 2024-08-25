'use client'
import { z } from 'zod'
const phoneNumberRegex = /^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/

export const formSignUpSchema = z.object({
	email: z.string().email('Email is not correct'),
	password: z
		.string()
		.min(6, { message: 'The password must be at least 6 characters' }),
	firstName: z
		.string()
		.min(2, { message: 'First name must be at least 2 characters' }),
	lastName: z
		.string()
		.min(2, { message: 'Last name must be at least 2 characters' }),
	phoneNumber: z
		.string()
		.min(18, { message: 'Phone number must be exactly 18 characters long' })
		.max(18, { message: 'Phone number must be exactly 18 characters long' })
		.regex(
			phoneNumberRegex,
			'Phone number must be in the format +7 (XXX) XXX XX-XX'
		)
})
export const formLoginSchema = z.object({
	email: z.string().email('Email is not correct'),
	password: z
		.string()
		.min(6, { message: 'The password must be at least 6 characters' })
})
