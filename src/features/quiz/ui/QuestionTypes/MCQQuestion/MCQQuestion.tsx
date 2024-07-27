import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import NavigationButtons from '../NavigationButton'

interface MCQQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	const [error, setError] = useState<boolean>(false)
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

	useEffect(() => {
		setSelectedChoice(selectedAnswers[question.id]?.[0] || null)
	}, [selectedAnswers, question.id])

	const handleChoiceClick = (choice: string) => {
		setSelectedChoice(choice)
	}

	const handleNext = () => {
		if (!selectedChoice) {
			setError(true)
			return
		}
		setError(false)

		setSelectedAnswers(question.id, [selectedChoice])
		onNext()
	}

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			{error && (
				<h4 className={'text-red-400 mb-5'}>
					{t('Please select at least one answer before proceeding')}
				</h4>
			)}
			<div className='flex flex-wrap gap-4 '>
				{question.choices?.map((choice, index) => (
					<Button
						key={index}
						size='3xl'
						color='secondary'
						onClick={() => handleChoiceClick(choice.content)}
						className={` ${
							selectedChoice === choice.content ? 'opacity-100' : 'opacity-50'
						}`}
					>
						{choice.content}
					</Button>
				))}
			</div>
			<NavigationButtons
				onPrev={onPrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
			/>
		</>
	)
}

export default MCQQuestion
