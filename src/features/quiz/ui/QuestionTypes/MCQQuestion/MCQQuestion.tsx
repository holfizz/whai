import { IChoice, IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import InfoIcon from '@/shared/assets/icons/InfoIcon'
import Button from '@/shared/ui/Button/Button'
import DotsLoader from '@/shared/ui/Loader/DotsLoader'
import SimpleMDX from '@/shared/ui/MDX/SimpleMDX'
import { Popover, PopoverContent } from '@/shared/ui/Popover/Popover'
import { PopoverTrigger } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { memo, Suspense, useCallback, useEffect, useState } from 'react'
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
const MCQQuestion = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}: MCQQuestionProps) => {
	const t = useTranslations('Quiz')

	const [checked, setChecked] = useState<boolean>(false)
	const [openPopover, setOpenPopover] = useState<number | null>(null)
	const { selectedAnswers, setSelectedAnswers } = useQuizStore()
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

	useEffect(() => {
		const savedChoice = selectedAnswers[question.id]?.[0] || null
		setSelectedChoice(savedChoice)
		setChecked(!!savedChoice)
	}, [selectedAnswers, question.id])

	const handleChoiceClick = useCallback(
		(choice: string, index: number) => {
			if (checked) {
				setOpenPopover(prevIndex => (prevIndex === index ? null : index))
				return
			}
			setSelectedChoice(choice)
		},
		[checked]
	)

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

	const getChoiceColor = useCallback(
		(choice: IChoice): string => {
			if (!checked) {
				return selectedChoice === choice.content ? 'main' : 'secondary'
			}
			const isSelected = choice.content === selectedChoice
			const isCorrect = question.answers.includes(choice.content)

			if (isSelected) {
				return isCorrect ? 'success' : 'error'
			} else {
				return isCorrect ? 'success' : 'gray-text'
			}
		},
		[checked, selectedChoice, question.answers]
	) as any

	const getIconColor = useCallback(
		(choice: IChoice): string => {
			const isSelected = choice.content === selectedChoice
			const isCorrect = question.answers.includes(choice.content)

			if (isSelected) {
				return isCorrect ? '#8EBB8B' : '#B78787'
			} else {
				return isCorrect ? '#8EBB8B' : '#BDBDBD'
			}
		},
		[selectedChoice, question.answers]
	) as any

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				<Suspense fallback={<div>Loading...</div>}>
					<SimpleMDX>{question.prompt}</SimpleMDX>
				</Suspense>
			</h3>
			<div className={cls.choicesContainer}>
				{question.choices?.map((choice, index) => {
					const description =
						choice.correctAnswerDescription || choice.incorrectAnswerDescription
					return (
						<Popover
							key={index}
							size='1/2'
							color={getChoiceColor(choice)}
							placement='top'
							shouldCloseOnBlur
							shouldCloseOnInteractOutside={() => true}
							isOpen={openPopover === index && checked && !!description}
							onClose={() => setOpenPopover(null)}
						>
							<PopoverTrigger>
								<Button
									className='relative px-5 py-3 min-w-[215px] min-h-[60px] gap-4 rounded-2xl w-full max-sm:w-[40vw] max-sm:h-[50px] !h-auto text-start'
									disableAnimation={false}
									endContent={
										checked &&
										description && (
											<InfoIcon
												fill={getIconColor(choice)}
												className='absolute right-4 w-5 top-4'
											/>
										)
									}
									color={getChoiceColor(choice)}
									onClick={() => handleChoiceClick(choice.content, index)}
								>
									<div className='w-full h-auto'>
										<h1
											className={`opacity-100 w-full break-words text-wrap h-auto ${
												checked
													? 'text-lg font-medium text-center'
													: 'text-left'
											}`}
										>
											<SimpleMDX>{choice.content}</SimpleMDX>
										</h1>
									</div>
								</Button>
							</PopoverTrigger>
							{checked && description && (
								<PopoverContent>
									<h1 className='text-xl font-bold text-left text-accent'>
										{choice.correctAnswerDescription
											? t('Correct')
											: t('Incorrect')}
										:
									</h1>
									<div className='px-1 py-2'>
										<Suspense fallback={<DotsLoader />}>
											<SimpleMDX>
												{choice.correctAnswerDescription ||
													choice.incorrectAnswerDescription}
											</SimpleMDX>
										</Suspense>
									</div>
								</PopoverContent>
							)}
						</Popover>
					)
				})}
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
