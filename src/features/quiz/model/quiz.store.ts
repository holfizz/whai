import { create } from 'zustand'

interface QuizState {
	answeredQuestions: { [key: string]: boolean } // хранит, был ли вопрос отвечен
	currentQuestion: string | null // ID текущего вопроса
	currentQuestionIndex: number // индекс текущего вопроса
	selectedAnswers: { [key: string]: string[] } // хранит выбранные ответы для вопросов, теперь массив строк
	matchingAnswers: { [key: string]: { value: string[] } } // хранит matching ответы в формате { value: string[] }
	setAnsweredQuestion: (questionId: string) => void
	setCurrentQuestion: (questionId: string) => void
	setCurrentQuestionIndex: (index: number) => void
	setSelectedAnswers: (questionId: string, answers: string[]) => void
	setMatchingAnswers: (questionId: string, answers: { value: string[] }) => void
}

export const useQuizStore = create<QuizState>(set => ({
	answeredQuestions: {},
	currentQuestion: null,
	currentQuestionIndex: 0,
	selectedAnswers: {},
	matchingAnswers: {},
	setAnsweredQuestion: (questionId: string) =>
		set(state => ({
			answeredQuestions: { ...state.answeredQuestions, [questionId]: true }
		})),
	setCurrentQuestion: (questionId: string) =>
		set({ currentQuestion: questionId }),
	setCurrentQuestionIndex: (index: number) =>
		set({ currentQuestionIndex: index }),
	setSelectedAnswers: (questionId: string, answers: string[]) =>
		set(state => ({
			selectedAnswers: { ...state.selectedAnswers, [questionId]: answers }
		})),
	setMatchingAnswers: (questionId: string, answers: { value: string[] }) =>
		set(state => ({
			matchingAnswers: { ...state.matchingAnswers, [questionId]: answers }
		}))
}))
