import { useQuizStore } from '@/features/quiz/model/quiz.store'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import NavigationButtons from '../NavigationButton'
import ClozeLine from './ClozeLine'

const ClozeQuestion = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	const {
		selectedAnswers,
		setSelectedAnswers,
		answeredQuestions,
		setAnsweredQuestion
	} = useQuizStore(state => ({
		selectedAnswers: state.selectedAnswers,
		setSelectedAnswers: state.setSelectedAnswers,
		answeredQuestions: state.answeredQuestions,
		setAnsweredQuestion: state.setAnsweredQuestion
	}))

	const [localAnswer, setLocalAnswer] = useState<string>('')
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

	useEffect(() => {
		setLocalAnswer(selectedAnswers[question.id]?.[0] || '')
		setIsCorrect(null)
	}, [selectedAnswers, question.id])

	const handleAnswerChange = useCallback((answer: string) => {
		setLocalAnswer(answer)
	}, [])

	const handleCheck = () => {
		if (!localAnswer) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}

		const correctAnswer = question.answers.join(' ')
		const answerIsCorrect =
			localAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()

		setIsCorrect(answerIsCorrect)
		setSelectedAnswers(question.id, [localAnswer])
		setAnsweredQuestion(question.id)

		if (answerIsCorrect) {
			toast.success(t('Correct'))
		} else {
			toast.error(t('Incorrect'))
		}
	}

	const handleNext = () => {
		if (!answeredQuestions[question.id]) {
			toast.error(t('Please check your answer before proceeding'))
			return
		}

		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const parsePrompt = (prompt: string) => {
		const elements = []
		const regex = /(<ClozeLine\s*\/>)/g
		let lastIndex = 0
		let match: RegExpExecArray | [any]

		while ((match = regex.exec(prompt)) !== null) {
			const [matchedText] = match
			const matchIndex = match.index

			if (matchIndex > lastIndex) {
				elements.push(
					<React.Fragment key={lastIndex}>
						{prompt.slice(lastIndex, matchIndex)}
					</React.Fragment>
				)
			}

			elements.push(
				<ClozeLine
					key={matchIndex}
					value={localAnswer}
					onChange={handleAnswerChange}
					isCorrect={isCorrect}
					isAnswered={answeredQuestions[question.id] || false}
				/>
			)

			lastIndex = matchIndex + matchedText.length
		}

		if (lastIndex < prompt.length) {
			elements.push(
				<React.Fragment key={lastIndex}>
					{prompt.slice(lastIndex)}
				</React.Fragment>
			)
		}

		return elements
	}

	const parsedPrompt = useMemo(
		() => parsePrompt(question.prompt),
		[question.prompt, localAnswer, answeredQuestions[question.id], isCorrect]
	)

	return (
		<>
			<div className='flex flex-col items-center mt-10'>
				<div className='flex flex-wrap items-center text-xl'>
					{parsedPrompt}
				</div>

				{answeredQuestions[question.id] && (
					<div
						className={`mt-10 text-2xl mx-2 flex items-center justify-center text-center`}
					>
						<h1>
							<strong>{t('Answer')}:</strong> {question.answers.join(' ')}
						</h1>
					</div>
				)}
			</div>
			<Toaster position='top-right' reverseOrder={false} />
			<NavigationButtons
				onPrev={handlePrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				isChecked={answeredQuestions[question.id]}
				onCheck={handleCheck}
			/>
		</>
	)
}
export default ClozeQuestion
