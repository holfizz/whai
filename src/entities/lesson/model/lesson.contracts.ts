// ILessonData.ts

import { z } from 'zod'

export const LessonTaskSchema = z.object({
	isChecked: z.boolean(),
	name: z.string()
})

export const LessonSchema = z.object({
	id: z.string(),
	name: z.string(),
	subtopicId: z.string(), // предполагается, что есть поле subtopicId
	isCompleted: z.boolean(),
	isHasLessonTask: z.boolean(),
	lessonTasks: z.array(LessonTaskSchema)
})

export type ILessonData = z.infer<typeof LessonSchema>
