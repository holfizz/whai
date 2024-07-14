import { z } from 'zod'

export const QuizData = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	totalPercents: z.number().optional(),
	quizResult: z
		.object({
			totalPercents: z.number().optional()
		})
		.optional()
})
