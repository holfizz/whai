export { QuizData } from './model/quiz.contracts'
export {
	GET_QUIZ_DATA,
	SAVE_QUIZ_RESULT,
	useCreateIndependentQuizWithAI,
	useGenerateKnowledgeSum,
	useGetAllIndependentQuizzes,
	useGetAllQuizzes,
	useGetLastQuizResult,
	useGetQuiz,
	useGetQuizData
} from './model/quiz.queries'
export { QuizQuestionType } from './model/quiz.types'
export type {
	IChoice,
	IMatchingInteraction,
	IQuestion,
	IQuiz,
	IQuizAnswer,
	IQuizData,
	IQuizDetails,
	IQuizResult,
	IQuizSummary,
	ISideType,
	IUserAnswer
} from './model/quiz.types'
