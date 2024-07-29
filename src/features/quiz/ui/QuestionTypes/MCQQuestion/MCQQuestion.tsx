import { IChoice, IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import NavigationButtons from '../NavigationButton'
import cls from './MCQQuestion.module.scss'

interface MCQQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const MCQQuestion = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}: MCQQuestionProps) => {
	const t = useTranslations('Quiz')
	const [error, setError] = useState<boolean>(false)
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
			setError(true)
			return
		}
		setError(false)
		setChecked(true)
		setSelectedAnswers(question.id, [selectedChoice])
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

	const getChoiceColor = (choice: IChoice) => {
		if (!checked) return 'secondary'
		if (choice.content === selectedChoice) {
			return choice.correctAnswerDescription ? 'success' : 'error'
		}
		return choice.correctAnswerDescription ? 'success' : 'gray-text'
	}

	const getChoiceClass = (choice: IChoice) => {
		if (!checked)
			return selectedChoice === choice.content ? 'opacity-100' : 'opacity-50'
		return ''
	}

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			{error && (
				<h4 className={'text-red-400 mb-5'}>
					{t('Please select and check your answer before proceeding')}
				</h4>
			)}
			<div className={cls.choicesContainer}>
				{question.choices?.map((choice, index) => (
					<Button
						key={index}
						size='auto'
						color={getChoiceColor(choice)}
						onClick={() => handleChoiceClick(choice.content)}
						className={getChoiceClass(choice)}
					>
						<h1
							className={`${
								checked &&
								'text-lg font-medium text-center w-full break-words whitespace-normal'
							}`}
						>
							{choice.content}
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

export default MCQQuestion
