import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import { Checkbox, CheckboxGroup } from '@nextui-org/react'
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

	useEffect(() => {
		setLocalAnswers(selectedAnswers[question.id] || [])
	}, [selectedAnswers, question.id])

	const handleChange = (values: string[]) => {
		setLocalAnswers(values)
	}

	const handleNext = () => {
		if (localAnswers.length === 0) {
			alert('Please select at least one answer before proceeding.')
			return
		}
		setSelectedAnswers(question.id, localAnswers)
		onNext()
	}

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			<CheckboxGroup
				value={localAnswers}
				onChange={handleChange}
				color='warning'
				className='flex flex-col gap-3'
			>
				{question.choices?.map((choice, index) => (
					<Checkbox key={index} value={choice.content}>
						{choice.content}
					</Checkbox>
				))}
			</CheckboxGroup>
			<NavigationButtons
				onPrev={onPrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
			/>
		</>
	)
}

export default MRQQuestion
