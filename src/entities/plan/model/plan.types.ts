import { LessonTypeEnum } from './plan.contracts'

export interface IQuizzesPlan {
	id: string
	name: string
	description: string
	subtopicId: string
	courseId: string
	isPlan: boolean
}

export interface ILessonPlan {
	id: string
	name: string
	description?: string
	types: LessonTypeEnum[]
	subtopicId: string
	courseId: string
}

export interface ISubtopicPlan {
	id: string
	name: string
	description?: string
	topicId: string
	lessons: ILessonPlan[]
	quizzes?: IQuizzesPlan[]
	completionTime: number
}

export interface ITopicPlan {
	id: string
	name: string
	description?: string
	courseId: string
	subtopics: ISubtopicPlan[]
	completionTime: number
}

export interface ICoursePlanWithAI {
	id: string
	name: string
	description?: string
	courseAIHistoryId: string
	topics: ITopicPlan[]
}
