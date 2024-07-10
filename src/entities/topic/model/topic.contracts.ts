import { z } from 'zod'

export const TopicsData = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	progressPercents: z.number()
})
