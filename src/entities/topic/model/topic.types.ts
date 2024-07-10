import { z } from 'zod'
import { CourseData } from '@/entities/course/model/course.contracts'

export interface ITopic {
	id: string
	name: string
	description: string
	isHasVideo: boolean
	totalSubtopics: number
	completionTime: number
	progressPercents: number
}

export type ICourseData = z.infer<typeof CourseData>
