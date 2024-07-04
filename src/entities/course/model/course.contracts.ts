import {z} from 'zod'

export const CourseData = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  progressPercents: z.number()
})
