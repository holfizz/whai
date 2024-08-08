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

interface MRQQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const MRQQuestion = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}: MRQQuestionProps) => {
	const t = useTranslations('Quiz')
	const { selectedAnswers, setSelectedAnswers } = useQuizStore()
	const [checked, setChecked] = useState<boolean>(false)
	const [openPopover, setOpenPopover] = useState<number | null>(null)
	const [selectedChoices, setSelectedChoices] = useState<string[]>([])

	useEffect(() => {
		const savedChoices = selectedAnswers[question.id] || []
		setSelectedChoices(savedChoices)
		setChecked(savedChoices.length > 0)
	}, [selectedAnswers, question.id])

	const handleChoiceClick = useCallback(
		(choice: string, index: number) => {
			if (checked) {
				setOpenPopover(prevIndex => (prevIndex === index ? null : index))
				return
			}
			setSelectedChoices(prevChoices =>
				prevChoices.includes(choice)
					? prevChoices.filter(c => c !== choice)
					: [...prevChoices, choice]
			)
		},
		[checked]
	)

	const handleCheck = () => {
		if (selectedChoices.length === 0) {
			toast.error(t('Please provide an answer before proceeding'))
			return
		}
		setChecked(true)
		setSelectedAnswers(question.id, selectedChoices)
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
				return selectedChoices.includes(choice.content) ? 'main' : 'secondary'
			}
			const isSelected = selectedChoices.includes(choice.content)
			const isCorrect = question.answers.includes(choice.content)

			if (isSelected) {
				return isCorrect ? 'success' : 'error'
			} else {
				return isCorrect ? 'success-4' : 'gray-text'
			}
		},
		[checked, selectedChoices, question.answers]
	)

	const getIconColor = useCallback(
		(choice: IChoice): string => {
			const isSelected = selectedChoices.includes(choice.content)
			const isCorrect = question.answers.includes(choice.content)

			if (isSelected) {
				return isCorrect ? '#8EBB8B' : '#B78787'
			} else {
				return isCorrect ? '#8EBB8B' : '#BDBDBD'
			}
		},
		[selectedChoices, question.answers]
	)

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				<Suspense fallback={<div>Loading...</div>}>
					<SimpleMDX>{question.prompt}</SimpleMDX>
				</Suspense>
			</h3>
			<h4 className='text-sm bg-decor-4 mb-10 rounded-md p-2'>
				{t('Choose 1 or more answer options')}
			</h4>
			<div className='grid grid-cols-2 gap-4 w-full'>
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
									className='relative'
									disableAnimation={false}
									size='auto'
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
									<div className='flex flex-col justify-center items-center'>
										<h1
											className={`opacity-100 ${
												checked &&
												'text-lg font-medium text-center w-full break-words whitespace-normal'
											}`}
										>
											<Suspense fallback={<DotsLoader />}>
												<SimpleMDX>{choice.content}</SimpleMDX>
											</Suspense>
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
										<SimpleMDX>
											{choice.correctAnswerDescription ||
												choice.incorrectAnswerDescription}
										</SimpleMDX>
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

export default memo(MRQQuestion)
