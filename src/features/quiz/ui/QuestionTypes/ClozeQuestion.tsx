import React, { useEffect, useState } from 'react'
import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'

interface ClozeQuestionProps {
	question: IQuestion
}

const ClozeQuestion: React.FC<ClozeQuestionProps> = ({ question }) => {
	const { selectedAnswers, setSelectedAnswers } = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers
	}))

	const [localAnswer, setLocalAnswer] = useState<string>(
		selectedAnswers[question.id]?.[0] || ''
	)

	useEffect(() => {
		setLocalAnswer(selectedAnswers[question.id]?.[0] || '')
	}, [selectedAnswers, question.id])

	const handleAnswerChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const answer = event.target.value
		setLocalAnswer(answer)
		setSelectedAnswers(question.id, [answer])
		console.log('Updated answers in store:', selectedAnswers)
	}

	return (
		<div>
			<h3>{question.prompt}</h3>
			<textarea
				rows={4}
				cols={50}
				value={localAnswer}
				onChange={handleAnswerChange}
			></textarea>
		</div>
	)
}

export default ClozeQuestion
