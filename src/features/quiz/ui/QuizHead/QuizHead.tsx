import { IQuizData } from '@/entities/quiz'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useQuizStore } from '../../model/quiz.store'

const QuizHead = ({ quizData }: { quizData: IQuizData }) => {
	const router = useRouter()
	const {
		selectedAnswers,
		matchingAnswers,
		setCurrentQuestionIndex,
		currentQuestionIndex
	} = useQuizStore()
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
		<div className='w-full flex justify-center items-center scrollbar-hide'>
			{/* Для экранов больше чем md показываем линии */}
			<div
				className={
					'hidden md:flex justify-start items-end gap-5 h-auto overflow-x-auto rounded-full scrollbar-hide'
				}
			>
				{quizData.questions.map((question, index) => {
					const isAnswered =
						(selectedAnswers[question.id] &&
							selectedAnswers[question.id].length > 0) ||
						(matchingAnswers[question.id] &&
							matchingAnswers[question.id].length > 0)

					return (
						<div
							key={index}
							className={`w-[85px] h-[6px] rounded-full bg-decor-2 flex-shrink-0 cursor-pointer scrollbar-hide ${
								isAnswered ? 'opacity-100' : 'opacity-50'
							}`}
							onClick={() => handleQuestionClick(index)}
						></div>
					)
				})}
			</div>

			{/* Для экранов меньше или равно md показываем номер текущего вопроса и общее количество */}
			<div className='md:hidden flex w-full items-center justify-center'>
				<div className='items-start justify-start text-lg font-semibold mt-8 gap-2 w-[80vw] '>
					<span className='text-decor-2 text-7xl font-bold'>
						{currentQuestionIndex + 1}
					</span>
					<span className='text-gray-3 text-3xl'>/</span>
					<span className='text-gray-3 text-3xl'>
						{quizData.questions.length}
					</span>
				</div>
			</div>
		</div>
	)
}

export default QuizHead
