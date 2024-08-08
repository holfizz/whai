'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
import { IQuiz, IQuizAnswer, IQuizData, KnowledgeSum } from './quiz.types'

export const GET_QUIZ = gql`
	query ($quizId: ID!) {
		getQuiz(quizId: $quizId) {
			id
			name
			courseId
			description
			quizResult {
				totalPercents
			}
			questions {
				id
			}
		}
	}
`
export const useGetQuiz = (quizId: string) => {
	const { data, error, loading } = useQuery<{ getQuiz: IQuiz }>(GET_QUIZ, {
		variables: { quizId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		quizData: data?.getQuiz,
		errorQuiz: error,
		loadingQuiz: loading
	}
}

export const GET_ALL_QUIZZES = gql`
	query ($subtopicId: ID!) {
		getAllQuizzes(subtopicId: $subtopicId) {
			id
			name
			description
			totalPercents
		}
	}
`
export const useGetAllQuizzes = (subtopicId: string) => {
	const { data, error, loading } = useQuery<{ getAllQuizzes: IQuiz[] }>(
		GET_ALL_QUIZZES,
		{
			variables: { subtopicId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		quizzesAllData: data?.getAllQuizzes,
		errorQuizzesAll: error,
		loadingQuizzesAll: loading
	}
}

export const GET_QUIZ_DATA = gql`
	query ($quizId: ID!) {
		getQuiz(quizId: $quizId) {
			id
			name
			courseId
			quizResult {
				quizId
				totalPercents
			}
			questions {
				id
				questionType
				prompt
				answers
				choices {
					correctAnswerDescription
					incorrectAnswerDescription
					content
				}
				matchingInteraction {
					left {
						content
					}
					right {
						content
					}
					answers
				}
			}
		}
	}
`
export const useGetQuizData = (quizId: string) => {
	const { data, error, loading } = useQuery<{ getQuiz: IQuizData }>(
		GET_QUIZ_DATA,
		{
			variables: { quizId },
			fetchPolicy: 'cache-and-network'
		}
	)
	return {
		quizData: data?.getQuiz,
		errorQuiz: error,
		loadingQuiz: loading
	}
}

export const SAVE_QUIZ_RESULT = gql`
	mutation SaveQuizResult($saveQuizResultInput: SaveQuizResultInput!) {
		saveQuizResult(saveQuizResultInput: $saveQuizResultInput) {
			id
			userId
			quizId
			courseId
			subtopicId
			totalPercents
			userAnswers {
				questionId
				correctnessPercentage
				matchingAnswers {
					right
					left
				}
				selectedAnswers
			}
		}
	}
`

export const GET_LAST_QUIZ_RESULT = gql`
	query GetLastQuizResult($quizId: ID!) {
		getLastSaveQuizResult(quizId: $quizId) {
			id
			quizId
			totalPercents
			userAnswers {
				questionId
				selectedAnswers
				correctnessPercentage
				correctAnswers
				matchingAnswers {
					right
					left
				}
			}
		}
	}
`
export const useGetLastQuizResult = (quizId: string) => {
	const { data, error, loading } = useQuery<{
		getLastSaveQuizResult: IQuizAnswer
	}>(GET_LAST_QUIZ_RESULT, {
		variables: { quizId },
		fetchPolicy: 'cache-and-network'
	})
	return {
		lastQuizResult: data?.getLastSaveQuizResult,
		errorLastQuizResult: error,
		loadingLastQuizResult: loading
	}
}
export const CREATE_INDEPENDENT_QUIZ_WITH_AI = gql`
	mutation CreateIndependentQuizWithAI($dto: QuizIndependentWithAIInput!) {
		createIndependentQuizWithAI(dto: $dto) {
			id
			name
			isCompleted
			quizResult {
				totalPercents
			}
			questions {
				answers
				id
				questionType
				prompt
				choices {
					content
				}
				matchingInteraction {
					left {
						content
					}
					right {
						content
					}
					answers
				}
			}
		}
	}
`
export const useCreateIndependentQuizWithAI = () => {
	const [createQuiz, { data, error, loading }] = useMutation<{
		createIndependentQuizWithAI: IQuizData
	}>(CREATE_INDEPENDENT_QUIZ_WITH_AI, { fetchPolicy: 'no-cache' })
	return {
		createQuiz,
		dataCreateQuiz: data?.createIndependentQuizWithAI,
		errorCreateQuiz: error,
		loadingCreateQuiz: loading
	}
}
export const GENERATE_KNOWLEDGE_SUM = gql`
	mutation generateKnowledgeSum($dto: KnowledgeSumInput!) {
		generateKnowledgeSum(dto: $dto) {
			summary
			strongPoints
			weakPoints
			recommendations
		}
	}
`
export const useGenerateKnowledgeSum = () => {
	const [generateKnowledgeSum, { data, error, loading }] = useMutation<{
		generateKnowledgeSum: KnowledgeSum
	}>(GENERATE_KNOWLEDGE_SUM)

	return {
		generateKnowledgeSum,
		knowledgeSumData: data?.generateKnowledgeSum,
		knowledgeSumError: error,
		knowledgeSumLoading: loading
	}
}
export const CREATE_QUIZ_WITH_AI = gql`
	mutation CreateQuizWithAI($QuizWithAIInput: QuizWithAIInput!) {
		createQuizWithAI(QuizWithAIInput: $QuizWithAIInput) {
			id
			name
			description
			questions {
				id
				questionType
				prompt
				choices {
					content
				}
				matchingInteraction {
					left {
						content
					}
					right {
						content
					}
					answers
				}
				answers
			}
			quizResult {
				totalPercents
			}
			isCompleted
		}
	}
`
export const useCreateQuizWithAI = () => {
	const [createQuizWithAI, { data, error, loading }] = useMutation<{
		createQuizWithAI: IQuiz
	}>(CREATE_QUIZ_WITH_AI, {
		fetchPolicy: 'no-cache'
	})

	return {
		createQuizWithAI,
		dataCreateQuizWithAI: data?.createQuizWithAI,
		errorCreateQuizWithAI: error,
		loadingCreateQuizWithAI: loading
	}
}
