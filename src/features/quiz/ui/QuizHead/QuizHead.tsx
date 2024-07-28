import { IQuizData } from '@/entities/quiz'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useQuizStore } from '../../model/quiz.store'

const QuizHead = ({ quizData }: { quizData: IQuizData }) => {
	const router = useRouter()
	const { selectedAnswers, matchingAnswers, setCurrentQuestionIndex } =
		useQuizStore()
	const [isOverflowing, setIsOverflowing] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current
		if (container && container.scrollWidth > container.clientWidth) {
			setIsOverflowing(true)
		} else {
			setIsOverflowing(false)
		}
	}, [quizData.questions.length])

	const handleQuestionClick = (index: number) => {
		const hash = `#${index + 1}`
		router.push(hash)
		setCurrentQuestionIndex(index)
	}
	return (
		<div className='w-full flex justify-center items-center'>
			<div
				className={
					'flex justify-start items-center gap-5 w-min overflow-x-auto rounded-full '
				}
			>
				{quizData.questions.map((question, index) => {
					const isAnswered =
						(selectedAnswers[question.id] &&
							selectedAnswers[question.id].length > 0) ||
						(matchingAnswers[question.id] &&
							matchingAnswers[question.id].length > 0)

					return (
						<>
							<div
								key={index}
								className={`w-[85px] h-[6px] rounded-full bg-decor-2 flex-shrink-0 cursor-pointer ${
									isAnswered ? 'opacity-100' : 'opacity-50'
								}`}
								onClick={() => handleQuestionClick(index)}
							></div>{' '}
						</>
					)
				})}
			</div>
		</div>
	)
}

export default QuizHead