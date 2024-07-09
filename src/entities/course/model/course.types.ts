import { z } from 'zod'
import { CourseData } from '@/entities/course/model/course.contracts'

export interface ICourse {
	id: string
	name: string
	description: string
	totalTopics: number
	progressPercents: number
	completionTime: number
}

export type ICourseData = z.infer<typeof CourseData>
