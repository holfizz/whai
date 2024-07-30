// coursePlanWithAI.contracts.ts

import { z } from 'zod'

export enum LessonTypeEnum {
	VIDEO = 'VIDEO',
	QUIZ = 'QUIZ',
	READING = 'READING',
	DISCUSSION = 'DISCUSSION'
}

export const QuizzesPlanSchema = z.object({
	name: z.string(),
	description: z.string(),
	subtopicId: z.string(),
	courseId: z.string(),
	isPlan: z.boolean()
})

export const LessonPlanSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	types: z.array(z.nativeEnum(LessonTypeEnum)),
	subtopicId: z.string(),
	courseId: z.string()
})

export const SubtopicPlanSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	topicId: z.string(),
	lessons: z.array(LessonPlanSchema),
	quizzes: z.array(QuizzesPlanSchema).optional(),
	completionTime: z.number()
})

export const TopicPlanSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	courseId: z.string(),
	subtopics: z.array(SubtopicPlanSchema),
	completionTime: z.number()
})

export const CoursePlanWithAISchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	additionalParams: z.string().optional(),
	courseAIHistoryId: z.string(),
	courseId: z.string(),
	userKnowledge: z.string().optional(),
	isHasVideo: z.boolean().optional(),
	topics: z.array(TopicPlanSchema)
})

export type CoursePlanWithAIType = z.infer<typeof CoursePlanWithAISchema>
