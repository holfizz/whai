import { z } from 'zod'
import { CourseData } from '@/entities/course/model/course.contracts'

// ILesson.ts

export interface ILesson {
	id: string
	name: string
	subtopicId: string
	isCompleted: boolean
	isHasLessonTask: boolean
	lessonTasks: ILessonTask[]
}

export interface ILessonTask {
	isChecked: boolean
	name: string
}

export type ILessonData = z.infer<typeof CourseData>
