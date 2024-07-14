import { z } from 'zod'
import { QuizData } from './quiz.contracts'

export interface IQuiz {
	id: string
	name: string
	description: string
	totalPercents?: number
	quizResult?: {
		totalPercents?: number
	}
}

// Экспортируем типы данных
export type IQuizData = z.infer<typeof QuizData>
