import React from 'react'
import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'

interface MRQQuestionProps {
	question: IQuestion
}

const MRQQuestion: React.FC<MRQQuestionProps> = ({ question }) => {
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const isChecked = event.target.checked
		const currentAnswers = selectedAnswers[question.id] || []

		if (isChecked) {
			// Add to answers array
			setSelectedAnswers(question.id, [...currentAnswers, value])
		} else {
			// Remove from answers array
			setSelectedAnswers(
				question.id,
				currentAnswers.filter(answer => answer !== value)
			)
		}
	}

	return (
		<div>
			<h3>{question.prompt}</h3>
			{question.choices?.map((choice, index) => (
				<div key={index}>
					<input
						type='checkbox'
						name={question.id}
						value={choice.content}
						checked={
							selectedAnswers[question.id]?.includes(choice.content) || false
						}
						onChange={handleChange}
						id={`${question.id}-${index}`}
					/>
					<label htmlFor={`${question.id}-${index}`}>{choice.content}</label>
				</div>
			))}
		</div>
	)
}

export default MRQQuestion
