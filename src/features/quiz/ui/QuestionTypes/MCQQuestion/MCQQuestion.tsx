import { IChoice, IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import Button from '@/shared/ui/Button/Button'
import { MDX } from '@/shared/ui/MDX/MDX'
import { useTranslations } from 'next-intl'
import { memo, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import NavigationButtons from '../NavigationButton'
import cls from './MCQQuestion.module.scss'

interface MCQQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}
const MemoizedMDX = memo(MDX)

const MCQQuestion = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}: MCQQuestionProps) => {
	const t = useTranslations('Quiz')

	const [checked, setChecked] = useState<boolean>(false)
	const { selectedAnswers, setSelectedAnswers } = useQuizStore()

	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

	useEffect(() => {
		const savedChoice = selectedAnswers[question.id]?.[0] || null
		setSelectedChoice(savedChoice)
		setChecked(!!savedChoice)
	}, [selectedAnswers, question.id])

	const handleChoiceClick = (choice: string) => {
		if (checked) return
		setSelectedChoice(choice)
	}

	const handleCheck = () => {
		if (!selectedChoice) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}
		setChecked(true)
		setSelectedAnswers(question.id, [selectedChoice])
	}

	const handleNext = () => {
		if (!checked) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}
		onNext()
	}

	const handlePrev = () => {
		onPrev()
	}

	const getChoiceColor = (choice: IChoice) => {
		if (!checked) {
			return selectedChoice === choice.content ? 'main' : 'secondary'
		}
		if (choice.content === selectedChoice) {
			return choice.correctAnswerDescription ? 'success' : 'error'
		}
		return choice.correctAnswerDescription ? 'success' : 'gray-text'
	}

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				<MemoizedMDX source={question.prompt}></MemoizedMDX>
			</h3>
			<div className={cls.choicesContainer}>
				{question.choices?.map((choice, index) => (
					<Button
						disableAnimation={false}
						disabled={checked}
						key={index}
						size='auto'
						color={getChoiceColor(choice)}
						onClick={() => handleChoiceClick(choice.content)}
					>
						<h1
							className={`opacity-100 ${
								checked &&
								'text-lg font-medium text-center w-full break-words whitespace-normal'
							}`}
						>
							<MemoizedMDX source={choice.content}></MemoizedMDX>
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
			<Toaster position='top-right' reverseOrder={false} />

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

export default memo(MCQQuestion)
