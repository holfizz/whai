import React, { useEffect, useState } from 'react'
import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'

interface MCQQuestionProps {
	question: IQuestion
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ question }) => {
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	// Initialize local state
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

	useEffect(() => {
		// Log selected answers to debug
		console.log('Selected Answers:', selectedAnswers)
		console.log('Question ID:', question.id)

		// Update local state based on store value
		setSelectedChoice(selectedAnswers[question.id]?.[0] || null)
	}, [selectedAnswers, question.id])

	const handleChoiceChange = (choice: string) => {
		setSelectedChoice(choice)
		setSelectedAnswers(question.id, [choice]) // Save choice as an array
	}

	return (
		<div>
			<h3>{question.prompt}</h3>
			{question.choices?.map((choice, index) => (
				<div key={index}>
					<input
						type='radio'
						name={question.id}
						id={`${question.id}-${index}`}
						value={choice.content}
						checked={selectedChoice === choice.content}
						onChange={() => handleChoiceChange(choice.content)}
					/>
					<label htmlFor={`${question.id}-${index}`}>{choice.content}</label>
				</div>
			))}
		</div>
	)
}

export default MCQQuestion
