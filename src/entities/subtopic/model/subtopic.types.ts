import { z } from 'zod'
import { CourseData } from '@/entities/course/model/course.contracts'

export interface IQuiz {
	id: string
	name: string
	description: string
	progressPercents?: number
}

export type ISubtopicData = z.infer<typeof CourseData>
