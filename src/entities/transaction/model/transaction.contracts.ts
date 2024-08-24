'use client'
import { z } from 'zod'

export const MakePaymentSchema = z.object({
	paymentUrl: z.string()
})
