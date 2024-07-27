import { create } from 'zustand'

interface QuizState {
	answeredQuestions: { [key: string]: boolean }
	currentQuestion: string | null
	currentQuestionIndex: number
	selectedAnswers: { [key: string]: string[] }
	matchingAnswers: { [key: string]: { left: string; right: string }[] }
	setAnsweredQuestion: (questionId: string) => void
	setCurrentQuestion: (questionId: string) => void
	setCurrentQuestionIndex: (index: number) => void
	setSelectedAnswers: (questionId: string, answers: string[]) => void
	setMatchingAnswers: (
		questionId: string,
		answers: { left: string; right: string }[]
	) => void
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
	setMatchingAnswers: (
		questionId: string,
		answers: { left: string; right: string }[]
	) =>
		set(state => ({
			matchingAnswers: {
				...state.matchingAnswers,
				[questionId]: answers
			}
		}))
}))
