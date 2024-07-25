'use client'
import { gql, useQuery } from '@apollo/client'
import { IQuiz, IQuizData } from './quiz.types'

export const GET_QUIZ = gql`
	query ($quizId: ID!) {
		getQuiz(quizId: $quizId) {
			id
			name
			description
			quizResult {
				totalPercents
			}
		}
	}
`
export const useGetQuiz = (subtopicId: string) => {
	const { data, error, loading } = useQuery<{ getQuiz: IQuiz }>(GET_QUIZ, {
		variables: { subtopicId },
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
			quizResult {
				correctAnswers
				quizId
				wrongAnswers
				totalPercents
			}
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
