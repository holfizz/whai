import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import ParenthesesWrapper from '@/shared/ui/MDX/ParentsWrapper'
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

	const [checked, setChecked] = useState<boolean>(false)

	useEffect(() => {
		setLocalAnswer(selectedAnswers[question.id]?.[0] || '')
	}, [selectedAnswers, question.id])

	const handleAnswerChange = (answer: string) => {
		setLocalAnswer(answer)
	}

	const handleCheck = () => {
		if (!localAnswer) {
			setError(true)
			return
		}
		setError(false)
		setChecked(true)
		setSelectedAnswers(question.id, [localAnswer])
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
		onPrev()
	}

	const parsePrompt = (prompt: string) => {
		const hasClozeLine = prompt.includes('<ClozeLine />')
		const adjustedPrompt = hasClozeLine
			? prompt
			: prompt.replace(/__+/g, '<ClozeLine />')

		const parts = adjustedPrompt.split(/<ClozeLine \/>/)
		return parts.map((part, index) => {
			if (index % 2 === 1) {
				// Render the part between ClozeLine components
				const isCorrect = question.answers?.includes(localAnswer)
				const choice = question.choices?.find(c => c.content === localAnswer)
				return (
					<React.Fragment key={index}>
						{checked && (
							<div
								className={`max-w-[300px] rounded-xl text-2xl min-w-[220px] h-[50px] mx-2 flex items-center justify-center ${
									isCorrect ? 'bg-success-4' : 'bg-error-4'
								} text-center text-white`}
							>
								{localAnswer}
							</div>
						)}
						{choice && (
							<div className='mt-2 text-center'>
								<h1
									className={`text-sm ${
										isCorrect ? 'text-green-700' : 'text-red-700'
									}`}
								>
									{isCorrect
										? choice.correctAnswerDescription
										: choice.incorrectAnswerDescription}
								</h1>
							</div>
						)}
						<ParenthesesWrapper
							className='flex flex-wrap text-lg leading-loose'
							color={'bg-decor-1'}
						>
							{part}
						</ParenthesesWrapper>
					</React.Fragment>
				)
			}
			return (
				<React.Fragment key={index}>
					<ParenthesesWrapper
						className='flex flex-wrap text-lg leading-loose'
						color={'bg-decor-1'}
					>
						{part}
					</ParenthesesWrapper>
					{index < parts.length - 1 && !checked && (
						<ClozeLine value={localAnswer} onChange={handleAnswerChange} />
					)}
				</React.Fragment>
			)
		})
	}

	return (
		<>
			<div className='flex flex-col items-center mt-10'>
				{error && (
					<h4 className={'text-red-400 my-5'}>
						{t('Please provide an answer before proceeding')}
					</h4>
				)}
				<div className='flex flex-wrap items-center text-xl'>
					{parsePrompt(question.prompt)}
				</div>
			</div>
			<NavigationButtons
				onPrev={handlePrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				isChecked={checked}
				onCheck={handleCheck}
			/>
		</>
	)
}

export default ClozeQuestion
