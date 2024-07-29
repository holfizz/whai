export interface IQuiz {
	id: string
	name: string
	description: string
	totalPercents?: number
	quizResult?: {
		totalPercents?: number
	}
}

export enum QuizQuestionType {
	MCQ = 'MCQ',
	MRQ = 'MRQ',
	CLOZE = 'CLOZE',
	MATCH = 'MATCH'
}
type arrayString = string[]
export interface IChoice {
	content: string
	correctAnswerDescription?: string
	incorrectAnswerDescription?: string
	questionId?: string
	interactionId?: string
}

export interface ISideType {
	content: string
}

export interface IMatchingInteraction {
	id?: string
	left: ISideType[]
	right: ISideType[]
	answers: string[][]
}

export interface IQuestion {
	id: string
	answers?: string[]
	questionType: QuizQuestionType
	prompt?: string
	choices?: IChoice[]
	matchingInteraction?: IMatchingInteraction
}

export interface IQuizResult {
	id: string
	userId: string
	quizId: string
	courseId: string
	lessonId?: string
	subtopicId?: string
	correctAnswers: number
	totalPercents?: number
	wrongAnswers: number
	userAnswers: IUserAnswer[]
}

export interface IUserAnswer {
	questionId: string
	selectedAnswers?: string[]
	isCorrect: boolean
}

export interface IQuizData {
	id: string
	name: string
	description?: string
	questions: IQuestion[]
	quizResult?: IQuizResult
	subtopicId?: string
	isCompleted?: boolean
	courseId: string
}

export interface IQuizDetails extends IQuizData {
	subtopicId: string
	quizResult?: IQuizResult
}

export interface IQuizSummary {
	id: string
	name: string
	description?: string
	totalPercents?: number
}

export interface IUserAnswer {
	questionId: string
	selectedAnswers?: string[]
	matchingAnswers?: { left: string; right: string }[]
}

export interface IQuizAnswer {
	id: string
	quizId: string
	totalPercents: number
	userAnswers: {
		id: string
		questionId: string
		selectedAnswers?: arrayString
		correctAnswers: string[]
		correctnessPercentage: number
		matchingAnswers?: {
			right: string
			left: string
		}[]
	}[]
}
export interface KnowledgeSum {
	summary: string
	strongPoints: string[]
	weakPoints: string[]
	recommendations: string[]
}
