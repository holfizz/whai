import { create } from 'zustand'

interface QuizState {
	answeredQuestions: { [key: string]: boolean }
	currentQuestion: string | null
	currentQuestionIndex: number
	selectedAnswers: { [key: string]: string[] }
	matchingAnswers: { [key: string]: { left: string; right: string }[] }
	quizResultId: string | null
	checkedQuestions: { [key: string]: boolean }
	setAnsweredQuestion: (questionId: string) => void
	setCurrentQuestion: (questionId: string) => void
	setCurrentQuestionIndex: (index: number) => void
	setSelectedAnswers: (questionId: string, answers: string[]) => void
	setMatchingAnswers: (
		questionId: string,
		answers: { left: string; right: string }[]
	) => void
	setQuizResultId: (id: string) => void
	setCheckedQuestion: (questionId: string, isChecked: boolean) => void
}

export const useQuizStore = create<QuizState>(set => ({
	answeredQuestions: {},
	currentQuestion: null,
	currentQuestionIndex: 0,
	selectedAnswers: {},
	matchingAnswers: {},
	quizResultId: null,
	checkedQuestions: {},
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
	setCheckedQuestion: (questionId: string, isChecked: boolean) =>
		set(state => ({
			checkedQuestions: { ...state.checkedQuestions, [questionId]: isChecked }
		}))
}))
