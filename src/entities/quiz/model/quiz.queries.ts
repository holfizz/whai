'use client'
import { gql, useQuery } from '@apollo/client'
import { IQuiz } from './quiz.types'

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
