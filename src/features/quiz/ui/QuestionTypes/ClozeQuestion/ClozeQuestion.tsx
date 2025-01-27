import { useQuizStore } from '@/features/quiz/model/quiz.store'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import NavigationButtons from '../NavigationButton'
import './Cloze.scss'
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
		const savedAnswer = selectedAnswers[question.id]?.[0] || ''
		setLocalAnswer(savedAnswer)
		// Re-evaluate correctness when localAnswer or question.answers change
		const correctAnswer = question.answers.join(' ')
		const answerIsCorrect =
			savedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
		setIsCorrect(answerIsCorrect)
	}, [selectedAnswers, question.id, question.answers])

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
		const regex = /(<ClozeLine\s*\/>)|(___+)/g
		let lastIndex = 0
		let match: RegExpExecArray | [any]

		while ((match = regex.exec(prompt)) !== null) {
			const [matchedText] = match
			const matchIndex = match.index

			// Добавляем текст перед текущим совпадением, заменяя пробелы на &nbsp;
			if (matchIndex > lastIndex) {
				const textBefore = prompt.slice(lastIndex, matchIndex)
				const words = textBefore.split(/(\s+)/).map((word, index) => (
					<span
						key={`word-${lastIndex + index}`}
						className='whitespace-nowrap text-span'
					>
						{word}
					</span>
				))
				elements.push(...words)
			}

			// Добавляем компонент `ClozeLine`
			elements.push(
				<ClozeLine
					key={`${question?.id}-${matchIndex}`}
					value={localAnswer}
					onChange={handleAnswerChange}
					isCorrect={isCorrect}
					isAnswered={answeredQuestions[question.id] || false}
				/>
			)

			lastIndex = matchIndex + matchedText.length
		}
		if (lastIndex < prompt.length) {
			const remainingText = prompt.slice(lastIndex)
			const words = remainingText.split(/(\s+)/).map((word, index) => (
				<span
					key={`word-${lastIndex + index}`}
					className='whitespace-nowrap text-span'
				>
					{word}
				</span>
			))
			elements.push(...words)
		}

		return elements
	}

	const parsedPrompt = useMemo(
		() => parsePrompt(question.prompt),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[question.prompt, localAnswer, answeredQuestions[question.id], isCorrect]
	)

	return (
		<>
			<div className='flex flex-col items-center mt-10 w-full px-10'>
				<div className='flex flex-wrap items-center text-xl whitespace-nowrap max-sm:text-center max-md:w-full'>
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
