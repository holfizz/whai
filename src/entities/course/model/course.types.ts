import { CourseData } from '@/entities/course/model/course.contracts'
import { z } from 'zod'

export interface ICourse {
	id: string
	name: string
	description: string
	imgUrl: string
	totalTopics: number
	progressPercents: number
	completionTime: number
	isStatic?: any
}

export type ICourseData = z.infer<typeof CourseData>
