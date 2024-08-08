import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
	answeredQuestions: { [key: string]: boolean }
	currentQuestion: string | null
	currentQuestionIndex: number
	selectedAnswers: { [key: string]: string[] }
	matchingAnswers: { [key: string]: { left: string; right: string }[] }
	userAnswerId: string | null
	quizResultId: string | null
	currentQuizId: string | null
	setAnsweredQuestion: (questionId: string) => void
	setCurrentQuestion: (questionId: string) => void
	setCurrentQuestionIndex: (index: number) => void
	setSelectedAnswers: (questionId: string, answers: string[]) => void
	setMatchingAnswers: (
		questionId: string,
		answers: { left: string; right: string }[]
	) => void
	setQuizResultId: (id: string) => void
	setCurrentQuizId: (id: string) => void
	resetState: () => void
}

export const useQuizStore = create<QuizState>()(
	persist(
		set => ({
			answeredQuestions: {},
			currentQuestion: null,
			currentQuestionIndex: 0,
			quizResultId: '',
			selectedAnswers: {},
			matchingAnswers: {},
			userAnswerId: null,
			currentQuizId: null,
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
					matchingAnswers: { ...state.matchingAnswers, [questionId]: answers }
				})),
			setQuizResultId: (id: string) => set({ quizResultId: id }),
			setCurrentQuizId: (id: string) => set({ currentQuizId: id }),
			resetState: () =>
				set({
					answeredQuestions: {},
					currentQuestion: null,
					currentQuestionIndex: 0,
					selectedAnswers: {},
					matchingAnswers: {},
					userAnswerId: null,
					currentQuizId: null
				})
		}),
		{
			name: 'quiz-storage',
			getStorage: () => localStorage
		}
	)
)
