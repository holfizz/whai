import React, { useEffect, useState } from 'react'
import { IQuestion, IQuizData, QuizQuestionType } from '@/entities/quiz'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import MatchQuestion from '@/features/quiz/ui/QuestionTypes/MatchQuestion'
import ClozeQuestion from '@/features/quiz/ui/QuestionTypes/ClozeQuestion'
import MRQQuestion from '@/features/quiz/ui/QuestionTypes/MRQQuestion'
import MCQQuestion from '@/features/quiz/ui/QuestionTypes/MCQQuestion'
import { useHash } from '@/shared/lib/hooks/useHash'

const QuizBody: React.FC<{ quizData: IQuizData }> = ({ quizData }) => {
	const router = useRouter()
	const hash = useHash()
	const {
		setAnsweredQuestion,
		setCurrentQuestion,
		setCurrentQuestionIndex,
		setSelectedAnswers,
		selectedAnswers,
		currentQuestionIndex
	} = useQuizStore(state => ({
		setAnsweredQuestion: state.setAnsweredQuestion,
		setCurrentQuestion: state.setCurrentQuestion,
		setCurrentQuestionIndex: state.setCurrentQuestionIndex,
		setSelectedAnswers: state.setSelectedAnswers,
		selectedAnswers: state.selectedAnswers,
		currentQuestionIndex: state.currentQuestionIndex
	}))

	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Check and set the current question based on the hash
		const index = parseInt(hash.substring(1), 10) - 1
		if (!isNaN(index) && index >= 0 && index < quizData.questions.length) {
			const questionId = quizData.questions[index].id
			setCurrentQuestion(questionId)
			setCurrentQuestionIndex(index) // Update index
			setError(null) // Clear error
		} else if (quizData.questions.length > 0) {
			const questionId = quizData.questions[0].id
			setCurrentQuestion(questionId)
			setCurrentQuestionIndex(0) // Update index
		}
	}, [hash, quizData.questions, setCurrentQuestion, setCurrentQuestionIndex])

	useEffect(() => {
		const currentHash = `#${currentQuestionIndex + 1}`
		if (window.location.hash !== currentHash) {
			router.push(currentHash)
		}
	}, [currentQuestionIndex, router])

	const currentQuestion = quizData.questions[currentQuestionIndex]

	const handleAnswer = () => {
		if (currentQuestion) {
			const selectedAnswer = selectedAnswers[currentQuestion.id]
			const isAnswerSelected = Array.isArray(selectedAnswer)
				? selectedAnswer.length > 0
				: !!selectedAnswer

			if (!isAnswerSelected) {
				setError('Выберите ответ перед переходом к следующему вопросу.')
				return
			}

			// Clear the error if a valid answer is selected
			setError(null)

			setAnsweredQuestion(currentQuestion.id)
			setSelectedAnswers(currentQuestion.id, selectedAnswer)

			const nextQuestionIndex = currentQuestionIndex + 1
			if (nextQuestionIndex < quizData.questions.length) {
				setCurrentQuestion(quizData.questions[nextQuestionIndex].id)
				setCurrentQuestionIndex(nextQuestionIndex) // Update index
			} else {
				alert('Викторина завершена!')
				// Or redirect to the results page
				// router.push(`/d/c/q/${quizData.id}/result`);
			}
		}
	}

	if (!currentQuestion) return null

	const renderQuestion = (question: IQuestion) => {
		switch (question.questionType) {
			case QuizQuestionType.MCQ:
				return <MCQQuestion question={question} />
			case QuizQuestionType.MRQ:
				return <MRQQuestion question={question} />
			case QuizQuestionType.CLOZE:
				return <ClozeQuestion question={question} />
			case QuizQuestionType.MATCH:
				return <MatchQuestion question={question} />
			default:
				return null
		}
	}

	return (
		<div>
			<div className='mb-4 p-4 border rounded'>
				{error && <h2 className='text-red-600'>{error}</h2>}
				{renderQuestion(currentQuestion)}
				<button onClick={handleAnswer}>Ответить</button>
			</div>
		</div>
	)
}

export default QuizBody
