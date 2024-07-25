import React, { useEffect, useState } from 'react'
import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'

interface MatchQuestionProps {
	question: IQuestion
}

const MatchQuestion: React.FC<MatchQuestionProps> = ({ question }) => {
	const { matchingAnswers, setMatchingAnswers } = useQuizStore(state => ({
		matchingAnswers: state.matchingAnswers,
		setMatchingAnswers: state.setMatchingAnswers
	}))

	const [localMatchingAnswers, setLocalMatchingAnswers] = useState<{
		[key: string]: string
	}>(
		matchingAnswers[question.id]?.value.reduce(
			(acc, curr) => {
				acc[curr] = ''
				return acc
			},
			{} as { [key: string]: string }
		) || {}
	)

	useEffect(() => {
		setLocalMatchingAnswers(
			matchingAnswers[question.id]?.value.reduce(
				(acc, curr) => {
					acc[curr] = ''
					return acc
				},
				{} as { [key: string]: string }
			) || {}
		)
	}, [matchingAnswers, question.id])

	const handleMatchChange = (leftItem: string, rightItem: string) => {
		setLocalMatchingAnswers(prev => ({
			...prev,
			[leftItem]: rightItem
		}))
		setMatchingAnswers(question.id, {
			value: Object.values({ ...localMatchingAnswers, [leftItem]: rightItem })
		})
	}

	return (
		<div>
			<h3>{question.prompt}</h3>
			<div className='flex'>
				<div>
					{question.matchingInteraction?.left.map((item, index) => (
						<div key={index}>
							<span>{item.content}</span>
							<select
								value={localMatchingAnswers[item.content] || ''}
								onChange={e => handleMatchChange(item.content, e.target.value)}
							>
								<option value=''>Select</option>
								{question.matchingInteraction.right.map((option, idx) => (
									<option key={idx} value={option.content}>
										{option.content}
									</option>
								))}
							</select>
						</div>
					))}
				</div>
				<div>
					{question.matchingInteraction?.right.map((item, index) => (
						<div key={index}>{item.content}</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MatchQuestion
