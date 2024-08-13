import { z } from 'zod'

export const SubtopicsData = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	progressPercents: z.number()
})
