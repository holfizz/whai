import { IChoice, IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz'
import Button from '@/shared/ui/Button/Button'
import React, { useEffect, useState } from 'react'
import NavigationButtons from '../NavigationButton'

interface MRQQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const MRQQuestion: React.FC<MRQQuestionProps> = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	const [localAnswers, setLocalAnswers] = useState<string[]>([])
	const [checked, setChecked] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		setLocalAnswers(selectedAnswers[question.id] || [])
		setChecked(!!selectedAnswers[question.id]?.length)
	}, [selectedAnswers, question.id])

	const handleChange = (values: string[]) => {
		setLocalAnswers(values)
	}

	const handleCheck = () => {
		if (localAnswers.length === 0) {
			setError(true)
			return
		}
		setError(false)
		setChecked(true)
		setSelectedAnswers(question.id, localAnswers)
	}

	const handleNext = () => {
		if (!checked) {
			setError(true)
			return
		}
		setError(false)
		onNext()
	}

	const handlePrev = () => {
		setChecked(false)
		setLocalAnswers([])
		onPrev()
	}

	const getChoiceColor = (choice: IChoice) => {
		if (!checked) return 'secondary'
		return choice.correctAnswerDescription ? 'success' : 'error'
	}

	const getChoiceClass = (choice: IChoice) => {
		if (!checked)
			return localAnswers.includes(choice.content)
				? 'opacity-100'
				: 'opacity-50'
		return ''
	}

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			{error && (
				<h4 className={'text-red-400 mb-5'}>
					Please select and check your answers before proceeding
				</h4>
			)}
			<div className='flex flex-col gap-3'>
				{question.choices?.map((choice, index) => (
					<Button
						key={index}
						size='auto'
						color={getChoiceColor(choice)}
						onClick={() => handleChange([...localAnswers, choice.content])}
						className={getChoiceClass(choice)}
					>
						<h1
							className={`${
								checked &&
								'text-lg font-medium text-center w-full break-words whitespace-normal'
							}`}
						>
							{choice.content}
						</h1>
						{checked && (
							<p
								className={
									'text-sm font-light text-center w-full break-words whitespace-normal'
								}
							>
								{choice.correctAnswerDescription ||
									choice.incorrectAnswerDescription}
							</p>
						)}
					</Button>
				))}
			</div>
			<NavigationButtons
				onPrev={handlePrev}
				onNext={handleNext}
				onCheck={handleCheck}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				isChecked={checked}
			/>
		</>
	)
}

export default MRQQuestion
