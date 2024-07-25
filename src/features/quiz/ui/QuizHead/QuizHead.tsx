import React from 'react'
import { IQuizData } from '@/entities/quiz'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/features/quiz/model/quiz.store'

const QuizHead = ({ quizData }: { quizData: IQuizData }) => {
	const router = useRouter()
	const { answeredQuestions, setCurrentQuestionIndex } = useQuizStore(
		state => ({
			answeredQuestions: state.answeredQuestions,
			setCurrentQuestionIndex: state.setCurrentQuestionIndex
		})
	)

	const handleQuestionClick = (index: number) => {
		const hash = `#${index + 1}`
		router.push(hash)
		setCurrentQuestionIndex(index)
	}

	return (
		<div>
			<div
				className={
					'flex justify-center items-center gap-5 w-[70vw] overflow-x-auto rounded-full'
				}
			>
				{quizData.questions.map((question, index) => {
					const isAnswered = answeredQuestions[question.id]
					return (
						<div
							key={index}
							className={`w-[85px] h-[6px] rounded-full bg-decor-2 flex-shrink-0 cursor-pointer ${
								isAnswered ? 'opacity-100' : 'opacity-50'
							}`}
							onClick={() => handleQuestionClick(index)}
						></div>
					)
				})}
			</div>
		</div>
	)
}

export default QuizHead
