import { IQuizData, QuizQuestionType } from '@/entities/quiz'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useQuizStore } from '../../model/quiz.store'
import ClozeQuestion from '../QuestionTypes/ClozeQuestion/ClozeQuestion'
import MatchQuestion from '../QuestionTypes/MatchQuestion/MatchQuestion'
import MCQQuestion from '../QuestionTypes/MCQQuestion/MCQQuestion'
import MRQQuestion from '../QuestionTypes/MRQQuestion/MRQQuestion'

const QuizBody: React.FC<{ quizData: IQuizData }> = ({ quizData }) => {
	const router = useRouter()
	const { currentQuestionIndex, setCurrentQuestionIndex } = useQuizStore(
		state => ({
			currentQuestionIndex: state.currentQuestionIndex,
			setCurrentQuestionIndex: state.setCurrentQuestionIndex
		})
	)

	const currentQuestion = quizData?.questions[currentQuestionIndex]
	const isFirstQuestion = currentQuestionIndex === 0
	const isLastQuestion = currentQuestionIndex === quizData?.questions.length - 1

	const handlePrev = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1)
		}
	}

	const handleNext = () => {
		if (currentQuestionIndex < quizData?.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		} else {
			// router.push('/q/result')
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

	return (
		<div className='flex flex-col items-center justify-center'>
			{renderQuestion()}
		</div>
	)
}

export default QuizBody
