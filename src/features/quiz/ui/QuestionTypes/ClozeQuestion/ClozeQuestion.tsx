import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import NavigationButtons from '../NavigationButton'
import ClozeLine from './ClozeLine' // Adjust the import path as necessary

interface ClozeQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const ClozeQuestion: React.FC<ClozeQuestionProps> = ({
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

	const [localAnswer, setLocalAnswer] = useState<string>(
		selectedAnswers[question.id]?.[0] || ''
	)

	useEffect(() => {
		setLocalAnswer(selectedAnswers[question.id]?.[0] || '')
	}, [selectedAnswers, question.id])

	const handleAnswerChange = (answer: string) => {
		setLocalAnswer(answer)
	}

	const handleNext = () => {
		// Save the answer to global state when "Next" is clicked
		if (!!selectedAnswers) {
			setError(true)
			return
		}
		setError(false)

		setSelectedAnswers(question.id, [localAnswer])
		onNext()
	}

	const parsePrompt = (prompt: string) => {
		const parts = prompt.split(/(<ClozeLine \/>)|(<\/ClozeLine>)/)
		return parts.map((part, index) => {
			if (part === '<ClozeLine />') {
				return (
					<ClozeLine
						key={index}
						value={localAnswer}
						onChange={handleAnswerChange}
					/>
				)
			} else if (typeof part === 'string') {
				return part.split(/(\s+)/).map((word, wordIndex) => (
					<React.Fragment key={`${index}-${wordIndex}`}>
						<span className='flex flex-wrap text-2xl leading-loose'>
							{word}
						</span>
						{word.match(/\s+/) ? <span>&nbsp;</span> : null}
					</React.Fragment>
				))
			} else {
				return null
			}
		})
	}

	return (
		<>
			<div className='flex flex-col items-center'>
				{error && (
					<h4 className={'text-red-400 my-5'}>
						{t('Please select at least one answer before proceeding')}
					</h4>
				)}
				<div className='flex flex-wrap items-center'>
					{parsePrompt(question.prompt)}
				</div>
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

export default ClozeQuestion
