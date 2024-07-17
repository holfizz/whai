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

export interface ILessonContent {
	id: string
	courseId: string
	subtopicId: string
	name: string
	isCompleted: boolean
	isHasLessonTask: boolean
	lessonTasks: ILessonTask[]
	lessonBlocks: ILessonBlock[]
}

export interface ILessonTask {
	isChecked: boolean
	name: string
}

export interface ILessonBlock {
	id: string
	type: LessonBlockType
	text: string
	videoUrl: string
	imageUrl: string
	code: string
	createdAt: string
}

export enum LessonBlockType {
	TEXT = 'TEXT',
	VIDEO = 'VIDEO',
	IMAGE = 'IMAGE',
	CODE = 'CODE'
}

export type ILessonData = z.infer<typeof CourseData>
