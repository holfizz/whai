import {
	IQuizData,
	QuizQuestionType,
	useGetLastQuizResult
} from '@/entities/quiz'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useQuizStore } from '../../model/quiz.store'
import ClozeQuestion from '../QuestionTypes/ClozeQuestion/ClozeQuestion'
import MatchQuestion from '../QuestionTypes/MatchQuestion/MatchQuestion'
import MCQQuestion from '../QuestionTypes/MCQQuestion/MCQQuestion'
import MRQQuestion from '../QuestionTypes/MRQQuestion/MRQQuestion'
import QuizResult from '../QuizResult/QuizResult'
const QuizBody = ({ quizData }: { quizData: IQuizData }) => {
	const t = useTranslations('Quiz')
	const {
		currentQuestionIndex,
		setCurrentQuestionIndex,
		selectedAnswers,
		matchingAnswers
	} = useQuizStore()
	const { lastQuizResult } = useGetLastQuizResult(quizData?.id)
	const [isFinished, setIsFinished] = useState(false)

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
			// Check if all questions have been answered
			const allAnswered = quizData.questions.every(question => {
				if (question.questionType === QuizQuestionType.MATCH) {
					return matchingAnswers[question.id]?.length > 0
				} else {
					return selectedAnswers[question.id]?.length > 0
				}
			})
			if (allAnswered) {
				setIsFinished(true)
			} else {
				toast.error(t('Please answer all questions before finishing the quiz'))
			}
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

	return isFinished ? (
		<QuizResult
			quizId={quizData?.id}
			courseId={quizData?.courseId}
			subtopicId={quizData?.subtopicId}
		/>
	) : (
		<div className='flex flex-col items-center justify-center min-h-[70vh]'>
			{renderQuestion()}
			<Toaster position='top-right' reverseOrder={false} />
		</div>
	)
}

export default QuizBody
