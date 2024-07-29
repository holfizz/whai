import {
	IQuizData,
	QuizQuestionType,
	useGetLastQuizResult
} from '@/entities/quiz'
import React from 'react'
import { useQuizStore } from '../../model/quiz.store'
import ClozeQuestion from '../QuestionTypes/ClozeQuestion/ClozeQuestion'
import MatchQuestion from '../QuestionTypes/MatchQuestion/MatchQuestion'
import MCQQuestion from '../QuestionTypes/MCQQuestion/MCQQuestion'
import MRQQuestion from '../QuestionTypes/MRQQuestion/MRQQuestion'
import QuizResult from '../QuizResult/QuizResult'

const QuizBody = ({ quizData }: { quizData: IQuizData }) => {
	const { currentQuestionIndex, setCurrentQuestionIndex } = useQuizStore()
	const { lastQuizResult } = useGetLastQuizResult(quizData?.id)
	const [isFinished, setIsFinished] = React.useState(false)

	const currentQuestion = quizData?.questions[currentQuestionIndex]
	const isFirstQuestion = currentQuestionIndex === 0
	const isLastQuestion = currentQuestionIndex === quizData?.questions.length - 1

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1)
		}
	}

	const handleNext = () => {
		if (isLastQuestion) {
			setIsFinished(true)
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		}
	}

	const renderQuestion = () => {
		switch (currentQuestion?.questionType) {
			case QuizQuestionType.CLOZE:
				return (
					<ClozeQuestion
						question={currentQuestion}
						onPrev={handlePrev}
						onNext={handleNext}
						isFirstQuestion={isFirstQuestion}
						isLastQuestion={isLastQuestion}
					/>
				)
			case QuizQuestionType.MATCH:
				return (
					<MatchQuestion
						question={currentQuestion}
						onPrev={handlePrev}
						onNext={handleNext}
						isFirstQuestion={isFirstQuestion}
						isLastQuestion={isLastQuestion}
					/>
				)
			case QuizQuestionType.MCQ:
				return (
					<MCQQuestion
						question={currentQuestion}
						onPrev={handlePrev}
						onNext={handleNext}
						isFirstQuestion={isFirstQuestion}
						isLastQuestion={isLastQuestion}
					/>
				)
			case QuizQuestionType.MRQ:
				return (
					<MRQQuestion
						question={currentQuestion}
						onPrev={handlePrev}
						onNext={handleNext}
						isFirstQuestion={isFirstQuestion}
						isLastQuestion={isLastQuestion}
					/>
				)
			default:
				return null
		}
	}

	if (isFinished) {
		return (
			<QuizResult
				quizId={quizData.id}
				courseId={quizData.courseId}
				subtopicId={quizData.subtopicId}
			/>
		)
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			{renderQuestion()}
		</div>
	)
}

export default QuizBody
