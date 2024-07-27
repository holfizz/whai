import { IQuestion } from '@/entities/quiz'
import { useQuizStore } from '@/features/quiz/model/quiz.store'
import Button from '@/shared/ui/Button/Button'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows'
import NavigationButtons from '../NavigationButton'
import cls from './MatchQuestion.module.scss'

interface MatchQuestionProps {
	question: IQuestion
	onPrev: () => void
	onNext: () => void
	isFirstQuestion: boolean
	isLastQuestion: boolean
}

const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1, j; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

const MatchQuestion: React.FC<MatchQuestionProps> = ({
	question,
	onPrev,
	onNext,
	isFirstQuestion,
	isLastQuestion
}) => {
	const t = useTranslations('Quiz')
	const [error, setError] = useState<boolean>(false)
	const { matchingAnswers, setMatchingAnswers } = useQuizStore(state => ({
		matchingAnswers: state.matchingAnswers,
		setMatchingAnswers: state.setMatchingAnswers
	}))

	const [localMatchingAnswers, setLocalMatchingAnswers] = useState<{
		[key: string]: string
	}>({})

	const [draggingItem, setDraggingItem] = useState<string | null>(null)

	const [shuffledLeft] = useState(() =>
		shuffleArray([...question.matchingInteraction.left])
	)
	const [shuffledRight] = useState(() =>
		shuffleArray([...question.matchingInteraction.right])
	)

	useEffect(() => {
		// Initialize answers from the store if they exist
		const storedAnswers = matchingAnswers[question.id] || []
		const initialAnswers = shuffledLeft.reduce((acc, leftItem) => {
			const match = storedAnswers.find(
				answer => answer.left === leftItem.content
			)
			acc[leftItem.content] = match ? match.right : ''
			return acc
		}, {} as { [key: string]: string })

		setLocalMatchingAnswers(initialAnswers)
	}, [shuffledLeft, matchingAnswers, question.id])

	const handleMatchChange = (leftItem: string, rightItem: string) => {
		setLocalMatchingAnswers(prev => ({
			...prev,
			[leftItem]: rightItem
		}))
	}

	const handleNext = () => {
		const allMatched = Object.values(localMatchingAnswers).every(
			value => value !== ''
		)

		if (!allMatched) {
			setError(true)
			return
		}

		setError(false)

		const formattedAnswers = Object.entries(localMatchingAnswers).map(
			([left, right]) => ({ left, right })
		)

		setMatchingAnswers(question.id, formattedAnswers)
		onNext()
	}

	const updateXarrow = useXarrow()

	return (
		<>
			<h3 className='w-[400px] text-accent text-center text-sm my-10'>
				{question.prompt}
			</h3>
			{error && (
				<h4 className={'text-red-400 mb-5'}>
					{t('Please match all items before proceeding')}
				</h4>
			)}
			<Xwrapper>
				<div className='relative flex justify-between w-full px-10'>
					<div className='flex flex-col gap-2 relative flex-wrap'>
						{shuffledLeft.map((item, index) => (
							<div key={index} className='relative w-min'>
								<Button
									size='lg'
									color='secondary'
									className='mb-2'
									onClick={() => setDraggingItem(item.content)}
								>
									{item.content}
								</Button>
								<div
									id={item.content}
									style={{
										right: '2px'
									}}
									className={cls.Circle}
									onMouseDown={() => setDraggingItem(item.content)}
								/>
							</div>
						))}
					</div>
					<div className='flex flex-col gap-2'>
						{shuffledRight.map((item, index) => (
							<div key={index} className='relative w-min'>
								<Button
									size='lg'
									color='primary'
									className='mb-2'
									onClick={() => {
										if (draggingItem) {
											handleMatchChange(draggingItem, item.content)
											setDraggingItem(null)
											updateXarrow()
										}
									}}
								>
									{item.content}
								</Button>
								<div
									id={item.content}
									className={cls.Circle}
									style={{ left: -10 }}
									onMouseUp={() => {
										if (draggingItem) {
											handleMatchChange(draggingItem, item.content)
											setDraggingItem(null)
											updateXarrow()
										}
									}}
								/>
							</div>
						))}
					</div>
				</div>
				{Object.entries(localMatchingAnswers).map(([left, right], index) =>
					right ? (
						<Xarrow
							key={index}
							start={left}
							end={right}
							color='var(--color-decor-2)'
							strokeWidth={2}
						/>
					) : null
				)}
			</Xwrapper>
			<NavigationButtons
				onPrev={onPrev}
				onNext={handleNext}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
			/>
		</>
	)
}

export default MatchQuestion
