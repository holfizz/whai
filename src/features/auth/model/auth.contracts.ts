'use client'
import { z } from 'zod'

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
		.min(9, { message: 'Phone number must be at least 10 characters' })
})

export const formLoginSchema = z.object({
	email: z.string().email('Email is not correct'),
	password: z
		.string()
		.min(6, { message: 'The password must be at least 6 characters' })
})
